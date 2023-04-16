// Components
import Head from 'next/head';

// MUI
import { ThemeProvider, createTheme } from '@mui/material';
import { deepPurple, pink } from '@mui/material/colors';

// Font
import localFont from 'next/font/local';
const alkatra = localFont({ src: '../assets/Alkatra-VariableFont_wght.ttf' });

// Styles
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: deepPurple[400],
            },
            secondary: {
                main: pink[400],
            },
        },
    });

    return (
        <>
            <Head>
                <title>Bonnie & Clyde</title>
                <meta name='description' content='Bonnie & Clyde app - Gonzalo Hernandez & Tomas Mudano' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
