import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchCardsOf, getBalance } from 'api/caverApi';
import * as KlipAPI from 'api/klipApi';
import * as CaverAPI from 'api/caverApi';
import { DEFAULT_ADDRESS, DEFAULT_QR_CODE, NFT_MARKET_CONTRACT_ADDRESS } from 'constants';
import QRCode from 'qrcode.react';
import Card from 'components/card';
import { css } from '@emotion/react';

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
    console.log(marketNfts);
    return (
        <div>
            <button onClick={fetchMarketNFT}>ddkdkdk</button>
            <div css={container}>
                {marketNfts.map((nft) => (
                    <Card key={nft.id} tokenUri={nft.tokenUri} tokenId={nft.id} />
                ))}
            </div>
        </div>
    );
};

export default Home;

const container = css`
    display: grid;
    grid-template-columns: 1;
    gap: 1rem;

    @media (min-width: 400px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 760px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
`;
