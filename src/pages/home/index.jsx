import React, { useEffect } from 'react';
import { useState } from 'react';
import * as KlipAPI from 'api/klipApi';
import * as CaverAPI from 'api/caverApi';
import { NFT_MARKET_CONTRACT_ADDRESS } from 'constants';
import Card from 'components/card';
import { css } from '@emotion/react';
import { setClose, setOpen } from 'slices/modalSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const [marketNfts, setMarketNfts] = useState([]);
    const dispatch = useDispatch();
    const { address } = useSelector(
        (state) => ({
            address: state.login.address
        }),
        shallowEqual
    );

    //fetch Market
    const fetchMarketNFT = async () => {
        const tokens = await CaverAPI.fetchCardsOf(NFT_MARKET_CONTRACT_ADDRESS);
        setMarketNfts(tokens || []);
    };

    // onClickMarketCard
    const onClickMarketCard = (tokenId) => {
        if (!address) {
            dispatch(setOpen({ message: `NFT를 구매하려면 \n 로그인해주세요` }));
            return;
        }

        KlipAPI.buyCard(tokenId, () => {
            dispatch(setClose());
            setMarketNfts((prev) => prev.filter((nft) => nft.id !== tokenId));
        });
        dispatch(setOpen({ message: 'NFT 구매하기' }));
    };

    useEffect(() => {
        fetchMarketNFT();
    }, []);

    return (
        <div>
            <div css={container}>
                {marketNfts.map((nft) => (
                    <Card
                        onClick={() => onClickMarketCard(nft.id)}
                        key={nft.id}
                        tokenUri={nft.tokenUri}
                        tokenId={nft.id}
                    />
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
