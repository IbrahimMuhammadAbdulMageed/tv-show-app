import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Head from 'next/head';
import { motion } from 'framer-motion';

const MainLayoutStyle = styled.div`
    main {
        margin-bottom: 30px;
    }
`;
interface IProps {
    title: string;
    children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = (props) => {
    const { title, children } = props;
    return (
        <MainLayoutStyle>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <motion.main
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: 'tween',
                    duration: 0.5,
                    ease: 'easeIn',
                }}
            >
                {children}
            </motion.main>
        </MainLayoutStyle>
    );
};
export default MainLayout;
