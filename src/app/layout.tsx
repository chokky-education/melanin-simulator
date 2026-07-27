import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UV & Melanin Simulator - Design by Google Stitch",
  description: "สื่อการเรียนรู้เรื่องรังสี UV และผลกระทบต่อผิว สำหรับนักศึกษามหาวิทยาลัย",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${beVietnamPro.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-[#f7f9fb] text-[#191c1e] font-sans min-h-screen flex flex-col antialiased selection:bg-[#131b2e] selection:text-white">
        {children}
      </body>
    </html>
  );
}
