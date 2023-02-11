import React, { useState } from 'react';

import * as KlipAPI from 'api/klipApi';
import { shallowEqual, useSelector } from 'react-redux';
import { DEFAULT_QR_CODE } from 'constants';
import QRCode from 'qrcode.react';
const Mint = () => {
    const [qrValue, setQrValue] = useState(DEFAULT_QR_CODE);
    const { address, balance } = useSelector(
        (state) => ({
            address: state.login.address,
            balance: state.login.balance
        }),
        shallowEqual
    );

    const onClickMint = async () => {
        if (!address) return;
        console.log('dkdkdk');
        const uniqueTokenId = `${new Date().valueOf()}`;
        await KlipAPI.mintCardWithURI(
            address,
            uniqueTokenId,
            'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F49DYn%2FbtrYRREGjSl%2FC0G8pfTBjwokiFLkPo0Ju0%2Fimg.png',
            setQrValue,
            (result) => {
                console.log('dkdkd');
            }
        );
    };
    return (
        <div>
            <button onClick={onClickMint}>발행하기</button>
            <QRCode value={qrValue} size={150} />
        </div>
    );
};

export default Mint;
