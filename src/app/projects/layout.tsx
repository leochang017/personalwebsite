import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Leo Chang",
  description: "Software engineering projects: NapkinNotes (EdTech), Stock Price Prediction ML (JEI-accepted research), Phase Spector (Godot game).",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
