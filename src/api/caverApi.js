import Caver from 'caver-js';
import {
    ACCESS_KEY_ID,
    SECRET_ACCESS_KEY,
    CHAIN_ID,
    NFT_CONTRACT_ADDRESS
} from 'constants';
import KIP17_ABI from 'abi/KIP17TokenABI.json';

const option = {
    headers: [
        {
            name: 'Authorization',
            value:
                'Basic ' +
                Buffer.from(ACCESS_KEY_ID + ':' + SECRET_ACCESS_KEY).toString('base64')
        },
        {
            name: 'x-chain-id',
            value: CHAIN_ID
        }
    ]
};

const caver = new Caver(
    new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', option)
);
const NFTContract = new caver.contract(KIP17_ABI, NFT_CONTRACT_ADDRESS);

export const fetchCardsOf = async (address) => {
    // Fetch Balance
    const balance = await NFTContract.methods.balanceOf(address).call();

    // Fetch Token Ids & Toekn Uris
    const tokens = [];
    for (let i = 0; i < balance; i++) {
        const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
        const tokenUri = await NFTContract.methods.tokenURI(id).call();
        tokens.push({ id, tokenUri });
    }
    return tokens;
};

export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((res) => {
        const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(res));
        return balance;
    });
};
