import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home';
import My from 'pages/my';
import Error from 'pages/404';
import RootLayout from 'components/Layout/RootLayout';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="my" element={<My />} />
            </Route>
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Router;
