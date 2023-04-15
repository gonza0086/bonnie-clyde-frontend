// Components
import Head from 'next/head';

// Styles
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Bonnie & Clyde</title>
                <meta name='description' content='Bonnie & Clyde app - Gonzalo Hernandez & Tomas Mudano' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
