import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Provider from "@/components/ui/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat With PDF",
  description:
    "Chat With PDF is an innovative application that revolutionizes the way you interact with PDF documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster richColors />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
