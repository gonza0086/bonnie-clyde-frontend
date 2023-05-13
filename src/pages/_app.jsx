// Components
import Head from 'next/head';
import { Navbar, Footer } from './components/barrels';

// Contexts
import ThemeContext from '@/contexts/ThemeContext';

// Styles
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Bonnie & Clyde</title>
                <meta name='description' content='Bonnie & Clyde app - Gonzalo Hernandez & Tomas Mudano' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <ThemeContext>
                <Provider store={store}>
                    <Navbar />
                    <div className='content'>
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </Provider>
            </ThemeContext>
        </>
    );
}
