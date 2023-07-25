import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import { Inconsolata } from "next/font/google";
import QueryProvider from "@/components/ui/queryclient-provider";
import { Metadata } from "next";

const inter = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bitmap.community",
  description:
    "Tools for bitmappers, by bitmappers.",
  openGraph: {
    type: "website",
    title: "bitmap.community",
    description:
      "Tools for bitmappers, by bitmappers.",
  },
  twitter: {
    title: "bitmap.community",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
