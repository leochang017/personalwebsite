import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ScrollProgress } from "@/components/ScrollProgress";
import { PageTransition } from "@/components/PageTransition";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      className={`${bricolage.variable} ${jakarta.variable} ${fira.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-body">
        <ScrollProgress />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
