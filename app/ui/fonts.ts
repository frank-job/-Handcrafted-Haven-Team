//Fonts file that you can import whenever you want to use a specific font - Boiketlo

import { Geist_Mono, Inter, Geist } from "next/font/google";

export const geistMono = Geist_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const inter = Inter({ subsets: ['latin'] });

