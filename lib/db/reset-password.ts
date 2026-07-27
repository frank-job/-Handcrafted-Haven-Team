// Reset Password Utility
// Run with: npx tsx lib/db/reset-password.ts
// or copy/paste the SQL below into your Neon Dashboard
// file for developers to cover back passwords in case of loss
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

async function resetPassword() {
  console.log('🔑 Handcrafted - Password Reset Tool\n');

  const email = await ask('Enter your email: ');
  const newPassword = await ask('Enter new password (min 6 chars): ');

  if (!email || !newPassword || newPassword.length < 6) {
    console.log('❌ Invalid input. Email required, password must be at least 6 characters.');
    rl.close();
    return;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const { rowCount } = await sql`
      UPDATE users
      SET password = ${hashedPassword}
      WHERE email = ${email}
    `;

    if (rowCount === 0) {
      console.log(`\n❌ No user found with email: ${email}`);
    } else {
      console.log(`\n✅ Password reset successfully for ${email}!`);
      console.log(`   You can now log in with your new password.`);
    }
  } catch (error) {
    console.error('\n❌ Database error:', error);
  }

  rl.close();
}

resetPassword();

