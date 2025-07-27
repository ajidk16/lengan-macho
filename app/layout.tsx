import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lengan Macho",
  description: "Created with dkaji",
  generator: "lengan-macho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
