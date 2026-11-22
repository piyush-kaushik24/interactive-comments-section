import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});
export const metadata: Metadata = {
  title: "Interactive Comments Section",
  description: "Frontend Mentor Interactive Comments Challenge",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${rubik.className} flex min-h-full flex-col`}>
        {children}
      </body>
    </html>
  );
}
