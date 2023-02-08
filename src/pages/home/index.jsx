import React from 'react';
import { useState } from 'react';
import { fetchCardsOf, getBalance } from 'api/caverApi';
import * as KlipAPI from 'api/klipApi';
import { DEFAULT_ADDRESS, DEFAULT_QR_CODE, NFT_MARKET_CONTRACT_ADDRESS } from 'constants';
import QRCode from 'qrcode.react';

const Home = () => {
    const [qrValue, setQrValue] = useState(DEFAULT_QR_CODE);
    const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
    const [myBalance, setMyBalance] = useState('0');
    const [nfts, setNfts] = useState([]);

    const getUserData = () => {
        KlipAPI.getAddress(setQrValue, async (address) => {
            setMyAddress(address);
            const _balance = await getBalance(address);
            setMyBalance(_balance);
        });
    };
    //fetch Market

    // fetchMyNFT

    // Mint

    // onClickMyCard

    // onClickMarketCard

    //getUserData

    //getBalance

    return (
        <div>
            <button type="button" onClick={getUserData}>
                테스트
            </button>
            주소 : {myAddress}
            잔액 : {myBalance}
            {qrValue && <QRCode value={qrValue} size={150} />}
        </div>
    );
};

export default Home;
