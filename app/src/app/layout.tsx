import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phonebook | Cultiv",
  description:
    "Phone Book application allowing users to create an account and manage contacts.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames("min-h-screen", inter.className)}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
