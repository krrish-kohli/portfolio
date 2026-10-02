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
  title: "Krrish Kohli — Software & AI/ML Engineer",
  description:
    "Portfolio of Krrish Kohli, a software and AI/ML engineer based in Long Beach, CA. Building intelligent, human-centered software — from gaze-powered accessibility tools and radar-based research to full-stack web apps.",
  openGraph: {
    title: "Krrish Kohli — Software & AI/ML Engineer",
    description:
      "Building intelligent, human-centered software — from gaze-powered accessibility tools and radar-based research to full-stack web apps.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
