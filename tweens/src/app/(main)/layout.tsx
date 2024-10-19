import "./globals.css";
import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";

// Initialize the font with any custom options
const albertSans = Albert_Sans({
  subsets: ["latin"], // Load specific subsets (like Latin)
  weight: ["400", "500", "700"], // Define the font weights you need
  style: ["normal", "italic"], // Optional styles if needed
  variable: "--font-albert-sans", // CSS variable for easier use in styles
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${albertSans.variable} bg-gray-100 font-sans antialiased`}>{children}</body>
    </html>
  );
}