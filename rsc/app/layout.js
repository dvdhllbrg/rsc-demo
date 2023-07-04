import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "../components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RSC",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className={`flex gap-8 min-h-screen flex-col items-center p-24 ${inter.className}`}
        >
          <Menu />
          {children}
        </main>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
