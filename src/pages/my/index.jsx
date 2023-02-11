import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import * as CaverAPI from 'api/caverApi';
import Card from 'components/card';
import { css } from '@emotion/react';

const My = () => {
    const { address, balance } = useSelector(
        (state) => ({
            address: state.login.address,
            balance: state.login.balance
        }),
        shallowEqual
    );

    const [myNfts, setMyNfts] = useState([]); //{totenId :"" , tokenURI : ""}

    const fetchMyNFT = async () => {
        const tokens = await CaverAPI.fetchCardsOf(address);
        setMyNfts(tokens || []);
    };
    return (
        <div>
            <p>주소 : {address}</p>
            <p>잔액 : {balance}</p>
            <button onClick={fetchMyNFT}>dkdkds</button>
            <div css={container}>
                {myNfts.map((nft) => (
                    <Card key={nft.id} tokenUri={nft.tokenUri} tokenId={nft.id} />
                ))}
            </div>
        </div>
    );
};

export default My;

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
