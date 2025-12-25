import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import ClientProviders from "../components/ClientProviders";
import { BRAND_NAME } from "@/utils/constants";
import "./globals.css";
import { ReactChildren } from "@/types/react-children-type";

const inter = Inter({
  subsets: ["cyrillic-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: `${BRAND_NAME} - A Password Manager`,
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} antialiased flex flex-col h-screen`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
