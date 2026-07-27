'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signUp(formData: FormData) {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const rawPassword = formData.get('password') as string;

  if (!username || !email || !rawPassword) {
    return { message: 'All fields are required.' };
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  try {
    await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.error('Signup error:', error);

    const err = error as { code?: string; message?: string };

    // Unique violation (email already exists)
    if (err.code === '23505') {
      return { message: 'An account with this email already exists.' };
    }

    // Show the actual database error message so you can debug easily
    const dbMessage = err?.message || 'Unknown database error';
    return { message: `Database Error: ${dbMessage}` };
  }

  // Create a profile for the new user
  try {
    await sql`
      INSERT INTO profiles (user_id, bio, location)
      VALUES (
        (SELECT id FROM users WHERE email = ${email}),
        'Hello! I am new to Handcrafted.',
        ''
      )
    `;
  } catch (error) {
    console.error('Profile creation error:', error);
    // Don't block signup if profile creation fails — it can be created later
  }

  redirect('/login');
}

export async function login(
  state: { message: string } | undefined,
  formData: FormData,
): Promise<{ message: string } | undefined> {
  const email = formData.get('email') as string;
  const rawPassword = formData.get('password') as string;

  if (!email || !rawPassword) {
    return { message: 'Email and password are required.' };
  }

  try {
    const { rows } = await sql`
      SELECT id, username, email, password FROM users WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return { message: 'No account found with this email.' };
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(rawPassword, user.password);

    if (!passwordMatch) {
      return { message: 'Incorrect password.' };
    }

    // Set a simple session cookie (you can replace with JWT or NextAuth later)
    const cookieStore = await cookies();
    cookieStore.set('session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

  } catch (error) {
    console.error('Login error:', error);
    const err = error as { message?: string };
    return { message: `Login Error: ${err?.message || 'Something went wrong.'}` };
  }

  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}



// ACTION: Update Profile Details
export async function updateProfile(formData: FormData) {
  const userId = formData.get('userId') as string;
  const bio = formData.get('bio') as string;
  const location = formData.get('location') as string;
  const imageUrl = formData.get('imageUrl') as string || null;

  try {
    // UPSERT: Insert a profile row if it doesn't exist, otherwise update it
    await sql`
      INSERT INTO profiles (user_id, bio, location, image_url)
      VALUES (${userId}, ${bio}, ${location}, ${imageUrl})
      ON CONFLICT (user_id) 
      DO UPDATE SET bio = EXCLUDED.bio, location = EXCLUDED.location, image_url = EXCLUDED.image_url
    `;
    return { message: 'Profile updated!' };
  } catch (error) {
    console.error('Update profile error:', error);
    return { message: 'Error updating profile.' };
  }
}

