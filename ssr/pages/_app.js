import { Inter } from "next/font/google";
import Head from "next/head";
import Menu from "../components/Menu";
import "/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SSR</title>
      </Head>
      <main
        className={`flex gap-8 min-h-screen flex-col items-center p-24 ${inter.className}`}
      >
        <Menu />
        <Component {...pageProps} />
      </main>
    </>
  );
}
