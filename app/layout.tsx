import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindLearn",
  description: "Adaptive learning-state modeling for study effectiveness"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
