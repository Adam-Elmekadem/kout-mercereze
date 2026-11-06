import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mercereze — Tailoring in motion",
  description:
    "An independent fashion concept exploring engineered tailoring, movement, and modern luxury.",
  openGraph: {
    title: "Mercereze — Tailoring in motion",
    description: "The first capsule from Kout Project.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="night">
      <body>{children}</body>
    </html>
  );
}
