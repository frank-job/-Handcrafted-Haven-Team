// definitions.ts

export type NewSignup = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
};

export type ProfileData = {
  id: string;
  username: string;
  email: string;
  bio: string | null;
  location: string | null;
  image_url: string | null;
};
