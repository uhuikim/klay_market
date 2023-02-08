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

// const countContract = new caver.contract(COUNT_ABI, COUNT_CONTRACT_ADDRESS);
// export const setCount = async (newCount) => {
//     try {
//         // 사용할 accoutn설정
//         const privatkey = "0xda837c85ee3fc39da210f5c3239636b0662e8b902402378658b87f4f0e2cafca";
//         const deployer = caver.wallet.keyring.createFromPrivateKey(privatkey);
//         caver.wallet.add(deployer);
//         // 스마트 컨트랙트 실행 트랜잭션 날리기
//         // 결과 확인

//         const receipt = await countContract.methods.setCount(newCount).send({
//             from: deployer.address,
//             gas: "0x4bfd200",
//         });
//         console.log(receipt);
//     } catch (e) {
//         console.log(e);
//     }
// };

// export const readCount = async () => {
//     const _count = await countContract.methods.count().call();
//     console.log(_count);
// };
