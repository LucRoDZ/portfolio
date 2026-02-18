import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lucas ZIVAN — Full Stack Developer",
  description: "Portfolio de Lucas ZIVAN, développeur full stack étudiant à EPITA. Spécialisé en React, Next.js, TypeScript et développement 3D interactif.",
  keywords: ["développeur", "full stack", "portfolio", "Next.js", "React", "Three.js", "TypeScript", "EPITA"],
  authors: [{ name: "Lucas ZIVAN" }],
  openGraph: {
    title: "Lucas ZIVAN — Full Stack Developer",
    description: "Portfolio premium d'un développeur full stack passionné",
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased noise`}
      >
        {children}
      </body>
    </html>
  );
}
