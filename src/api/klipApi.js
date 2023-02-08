import axios from 'axios';
import { NFT_CONTRACT_ADDRESS } from 'constants';
import { APP_NAME } from 'constants';
import { A2P_API_REQUEST_URL, A2P_API_RESULT_URL, A2P_API_PREPARE_URL } from 'constants';

export const getAddress = (setQrValue, callback) => {
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
            setQrValue(klipConnectUrl);
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

export const executeContract = (
    txTo,
    functionJSON,
    value,
    params,
    setQrValue,
    callback
) => {
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
            const klipConnectUrl = `${A2P_API_REQUEST_URL}?request_key=${requestKey}`;
            setQrValue(klipConnectUrl);
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
                            console.log(res.data.result);

                            setQrValue('DEFAULT');

                            if (res.data.result.status === 'success') {
                                clearInterval(timerId);
                            }
                        }
                    });
            }, 1000);
        });
};

export const mintCardWithURI = async (toAddress, tokenId, uri, setQrValue, callback) => {
    const functionJSON =
        ' { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "tokenId", "type": "uint256" }, { "name": "tokenURI", "type": "string" } ], "name": "mintWithTokenURI", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }';
    executeContract(
        NFT_CONTRACT_ADDRESS,
        functionJSON,
        '0',
        `[\"${toAddress}\",\"${tokenId}\",\"${uri}\"]`,
        setQrValue,
        callback
    );
};
