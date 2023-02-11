import React from 'react';
import { useState } from 'react';
import { fetchCardsOf, getBalance } from 'api/caverApi';
import * as KlipAPI from 'api/klipApi';
import * as CaverAPI from 'api/caverApi';
import { DEFAULT_ADDRESS, DEFAULT_QR_CODE, NFT_MARKET_CONTRACT_ADDRESS } from 'constants';
import QRCode from 'qrcode.react';

const Home = () => {
    const [qrValue, setQrValue] = useState(DEFAULT_QR_CODE);
    const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);
    const [myBalance, setMyBalance] = useState('0');
    const [marketNfts, setMarketNfts] = useState([]);

    const getUserData = () => {
        KlipAPI.getAddress(setQrValue, async (address) => {
            setMyAddress(address);
            const _balance = await getBalance(address);
            setMyBalance(_balance);
        });
    };
    //fetch Market
    const fetchMarketNFT = async () => {
        const tokens = await CaverAPI.fetchCardsOf(NFT_MARKET_CONTRACT_ADDRESS);
        setMarketNfts(tokens || []);
    };
    // fetchMyNFT

    // Mint

    // onClickMyCard

    // onClickMarketCard

    //getUserData

    //getBalance

    return <div>홈</div>;
};

export default Home;
