import React, { useState } from 'react';

import * as KlipAPI from 'api/klipApi';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setOpen } from 'slices/modalSlice';
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
            (result) => {
                console.log('민팅');
            }
        );

        dispatch(setOpen({ message: '민팅' }));
    };

    return (
        <div>
            <form onSubmit={onClickMint}>
                <input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
                <button type="submit">발행하기</button>
            </form>
            {imgUrl && <img src={imgUrl} alt="이미지" />}
        </div>
    );
};

export default Mint;
