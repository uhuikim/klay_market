import React from 'react';
import { useState } from 'react';
import { fetchCardsOf, getBalance } from 'api/caverApi';
import * as KlipAPI from 'api/klipApi';
import { DEFAULT_ADDRESS, DEFAULT_QR_CODE, NFT_MARKET_CONTRACT_ADDRESS } from 'constants';

const Home = () => {
    const [qrValue, setQrValue] = useState(DEFAULT_QR_CODE);
    const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
    const [myBalance, setMyBalance] = useState('0');

    const getUserData = () => {
        KlipAPI.getAddress(setQrValue, async (address) => {
            setMyAddress(address);
            const _balance = await getBalance(address);
            setMyBalance(_balance);
        });
    };

    console.log(myAddress, myBalance);
    return (
        <div>
            <button type="button" onClick={getUserData}>
                테스트
            </button>
        </div>
    );
};

export default Home;
