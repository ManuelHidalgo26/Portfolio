import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manuel Hidalgo — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Node.js and modern web applications. Available for freelance projects and full-time roles.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Manuel Hidalgo"],
  authors: [{ name: "Manuel Hidalgo Castaños" }],
  openGraph: {
    title: "Manuel Hidalgo — Full Stack Developer",
    description: "Full Stack Developer specializing in React, Node.js and modern web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
