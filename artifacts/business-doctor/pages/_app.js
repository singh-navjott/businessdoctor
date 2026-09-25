import Head from 'next/head';
import { sora, inter } from '../lib/fonts';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#0B3B5C" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${sora.variable} ${inter.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}