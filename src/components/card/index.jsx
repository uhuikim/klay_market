import React from 'react';
import { css } from '@emotion/react';

const Card = ({ tokenId, tokenUri }) => {
    return (
        <div css={container}>
            <div css={imgWrap}>
                <img src={tokenUri} alt="nft이미지" />
            </div>
            <p css={title}> #{tokenId}</p>
        </div>
    );
};

const container = css`
    padding: 0.5rem;
    border-radius: 12px;
    box-shadow: rgb(30 31 36 / 15%) 0px 4px 8px;
`;
const imgWrap = css`
    border-radius: 16px;
    border: 1px solid rgb(238, 239, 241);
    overflow: hidden;
    line-height: 0;
    > img {
        width: 100%;
        height: 100%;
        object-fit: contain;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

const title = css`
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 6px;
    text-align: right;
`;

export default Card;
