import axios from 'axios';
import { NFT_MARKET_CONTRACT_ADDRESS } from 'constants';
import { NFT_CONTRACT_ADDRESS } from 'constants';
import { APP_NAME } from 'constants';
import { A2P_API_REQUEST_URL, A2P_API_RESULT_URL, A2P_API_PREPARE_URL } from 'constants';
import { store } from 'app/store';
import { setQrValue } from 'slices/modalSlice';

export const getAddress = (callback) => {
    axios
        .post(A2P_API_PREPARE_URL, {
            bapp: {
                name: APP_NAME
            },
            type: 'auth'
        })
        .then((response) => {
            const { request_key: requestKey } = response.data;
            const klipConnectUrl = `${A2P_API_REQUEST_URL}?request_key=${requestKey}`;
            store.dispatch(setQrValue({ qrValue: klipConnectUrl }));

            // if (isMobile) {
            //     window.location.href = klipConnectUrl;
            // } else {
            //     setQrValue(klipConnectUrl);
            // }

            let timerId = setInterval(() => {
                axios
                    .get(`${A2P_API_RESULT_URL}?request_key=${requestKey}`)
                    .then((res) => {
                        if (res.data.result) {
                            callback(res.data.result.klaytn_address);
                            clearInterval(timerId);
                            setQrValue('DEFAULT');
                        }
                    });
            }, 1000);
        });
};

export const executeContract = (txTo, functionJSON, value, params, callback) => {
    axios
        .post(A2P_API_PREPARE_URL, {
            bapp: {
                name: APP_NAME
            },
            type: 'execute_contract',
            transaction: {
                to: txTo,
                value: value,
                abi: functionJSON,
                params: params
            }
        })
        .then((response) => {
            const { request_key: requestKey } = response.data;
            console.log(requestKey);
            const klipConnectUrl = `${A2P_API_REQUEST_URL}?request_key=${requestKey}`;
            store.dispatch(setQrValue({ qrValue: klipConnectUrl }));

            // if (isMobile) {
            //     window.location.href = klipConnectUrl;
            // } else {
            //     setQrValue(klipConnectUrl);
            // }

            let timerId = setInterval(() => {
                axios
                    .get(`${A2P_API_RESULT_URL}?request_key=${requestKey}`)
                    .then((res) => {
                        if (res.data.result) {
                            callback(res.data.result.klaytn_address);
                            store.dispatch(setQrValue({ qrValue: 'DEFAULT' }));

                            if (res.data.result.status === 'success') {
                                clearInterval(timerId);
                            }
                        }
                    });
            }, 1000);
        });
};

export const mintCardWithURI = async (toAddress, tokenId, uri, callback) => {
    const functionJSON =
        ' { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(
        NFT_CONTRACT_ADDRESS,
        functionJSON,
        '0',
        `[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,
        callback
    );
};

export const buyCard = async (tokenId, callback) => {
    const functionAbi = `{"constant": false, "inputs": [ { "name": "tokenId", "type": "uint256" }, { "name": "NFTAddress", "type": "address" } ], "name": "buyNFT", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }`;
    console.log(tokenId);
    executeContract(
        NFT_MARKET_CONTRACT_ADDRESS,
        functionAbi,
        '10000000000000000',
        `["${tokenId}","${NFT_CONTRACT_ADDRESS}"]`,
        callback
    );
};

export const sellCard = async (from, tokenId, callback) => {
    const functionAbi = `{ "constant": false, "inputs": [ { "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }`;

    executeContract(
        NFT_CONTRACT_ADDRESS,
        functionAbi,
        '0',
        `["${from}","${NFT_MARKET_CONTRACT_ADDRESS}","${tokenId}"]`,
        callback
    );
};
