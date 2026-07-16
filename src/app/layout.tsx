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

const SITE_DESCRIPTION =
  "Leo Chang is a senior at Princeton Day School (Class of 2027) — a student researcher and builder working on machine learning, LLM multi-agent systems, and full-stack web apps.";

export const metadata: Metadata = {
  metadataBase: new URL("https://leochang.net"),
  title: "Leo Chang | Portfolio",
  description: SITE_DESCRIPTION,
  keywords: "Leo Chang, Princeton Day School, Student Portfolio, Computer Science, Machine Learning, Research",
  authors: [{ name: "Leo Chang" }],
  openGraph: {
    type: "website",
    url: "https://leochang.net",
    siteName: "Leo Chang",
    title: "Leo Chang | Portfolio",
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/Leo.jpeg", width: 600, height: 338, alt: "Leo Chang" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leo Chang | Portfolio",
    description: SITE_DESCRIPTION,
    images: ["/images/Leo.jpeg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Leo Chang",
  url: "https://leochang.net",
  image: "https://leochang.net/images/Leo.jpeg",
  email: "mailto:leochang017@gmail.com",
  affiliation: {
    "@type": "EducationalOrganization",
    name: "Princeton Day School",
  },
  knowsAbout: ["Machine Learning", "LLM Multi-Agent Systems", "Full-Stack Web Development"],
  sameAs: [
    "https://github.com/leochang017",
    "https://www.instagram.com/leo.c000/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ScrollProgress />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
