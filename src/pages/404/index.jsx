import React from 'react';
import { css } from '@emotion/react';

const Error = () => {
    return <div css={wrap}>PAGE NOT FOUND!</div>;
};

export default Error;

const wrap = css`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    font-weight: 600;
`;
