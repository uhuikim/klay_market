import { css } from '@emotion/react';
import React from 'react';
import { palette } from 'styles/palette';

const Divider = () => {
    return <hr css={divider} />;
};

export default Divider;

const divider = css`
    border: 0;
    border-top: 1px solid ${palette.gray50};
    margin: 0;
`;
