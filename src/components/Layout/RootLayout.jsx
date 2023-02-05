import { css } from '@emotion/react';
import Modal from 'components/common/modal';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { container } from 'styles/common/layout';
import Footer from './Footer';
import Header from './Header';

const RootLayout = () => {
    return (
        <div css={wrap}>
            <Header />
            <main css={container}>
                <Outlet />
            </main>
            <Footer />
            <Modal />
        </div>
    );
};

export default RootLayout;

const wrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;
