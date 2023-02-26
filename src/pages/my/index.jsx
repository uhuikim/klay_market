import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as CaverAPI from 'api/caverApi';
import Card from 'components/card';
import { css } from '@emotion/react';
import * as KlipAPI from 'api/klipApi';
import { setClose, setOpen } from 'slices/modalSlice';
const My = () => {
    const dispatch = useDispatch();
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

    const onClickMyCard = (tokenId) => {
        KlipAPI.sellCard(address, tokenId, () => {
            dispatch(setClose());
            setMyNfts((prev) => prev.filter((nft) => nft.id !== tokenId));
        });

        dispatch(setOpen({ message: 'NFT 판매하기' }));
    };

    useEffect(() => {
        fetchMyNFT();
    }, []);

    return (
        <div>
            <div css={infoWrap}>
                <p>
                    <span css={infoTitle}>주소</span>
                    {address}
                </p>
                <p>
                    <span css={infoTitle}>잔액</span>
                    {balance} KLAY
                </p>
            </div>

            <div css={container}>
                {myNfts.map((nft) => (
                    <Card
                        onClick={() => onClickMyCard(nft.id)}
                        key={nft.id}
                        tokenUri={nft.tokenUri}
                        tokenId={nft.id}
                    />
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

const infoWrap = css`
    border-radius: 10px;
    background: #eceff1;
    padding: 1.5rem 2rem;
    box-shadow: rgb(21 22 25 / 5%) 0px 4px 8px;
    margin-bottom: 1rem;

    > p {
        word-break: break-all;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    & > p:first-child {
        margin-bottom: 0.5rem;
    }
`;

const infoTitle = css`
    margin-right: 1rem;
    font-weight: bold;
`;
