import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas ZIVAN - Portfolio",
  description: "Portfolio de Lucas ZIVAN, développeur full stack passionné de 3D et UI/UX. Découvrez mes projets et compétences en Next.js, React, Three.js et plus encore.",
  keywords: ["développeur", "portfolio", "Next.js", "React", "Three.js", "TypeScript", "full stack"],
  authors: [{ name: "Lucas ZIVAN" }],
  openGraph: {
    title: "Lucas ZIVAN - Portfolio",
    description: "Portfolio de développeur full stack",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
