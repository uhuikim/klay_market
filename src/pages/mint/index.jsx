import React, { useState } from 'react';

import * as KlipAPI from 'api/klipApi';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setClose, setOpen } from 'slices/modalSlice';
import { css } from '@emotion/react';
const Mint = () => {
    const dispatch = useDispatch();
    const [imgUrl, setImgUrl] = useState('');
    const { address } = useSelector(
        (state) => ({
            address: state.login.address
        }),
        shallowEqual
    );

    const onClickMint = async (e) => {
        e.preventDefault();
        if (!address) return;
        const uniqueTokenId = `${new Date().valueOf()}`;
        await KlipAPI.mintCardWithURI(
            address,
            uniqueTokenId,
            'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F49DYn%2FbtrYRREGjSl%2FC0G8pfTBjwokiFLkPo0Ju0%2Fimg.png',
            () => {
                dispatch(setClose());
            }
        );

        dispatch(setOpen({ message: '민팅하기' }));
    };

    return (
        <div css={container}>
            <form css={formWrap} onSubmit={onClickMint}>
                <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <button css={button} type="submit">
                    발행하기
                </button>
            </form>
            <div css={nftImage}>{imgUrl && <img src={imgUrl} alt="이미지" />}</div>
        </div>
    );
};

export default Mint;

const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const formWrap = css`
    margin-bottom: 1rem;

    > input {
        padding: 0.5rem 1rem;
        border: 1px solid #eceff1;
        border-radius: 8px;
    }
    input:focus {
        outline: none;
    }
`;

const button = css`
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin-left: 0.5rem;
`;
const nftImage = css`
    width: 50%;

    > img {
        width: 100%;
    }
`;
