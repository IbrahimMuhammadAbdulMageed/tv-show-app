import '../styles/globals.scss';
import 'swiper/css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import NextNProgress from 'nextjs-progressbar';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <NextNProgress color={'#ffc907'} />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
