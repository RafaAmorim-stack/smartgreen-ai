import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartGreen AI",
  description: "Sistema inteligente de controle semaforico para cruzamentos urbanos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
