import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ScrollProgress } from "@/components/ScrollProgress";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fira = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Leo Chang | Portfolio",
  description:
    "CS student, researcher, and builder. Portfolio showcasing software engineering projects, leadership, and achievements.",
  keywords: "Leo Chang, Software Engineer, Portfolio, Computer Science",
  authors: [{ name: "Leo Chang" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${jakarta.variable} ${fira.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-body">
        <ScrollProgress />
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
