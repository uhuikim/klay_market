import { DEFAULT_ADDRESS } from 'constants';
import { DEFAULT_QR_CODE } from 'constants';
import { useState } from 'react';
import * as KlipAPI from 'api/klipApi';
import { getBalance } from 'api/caverApi';
import { setLogin } from 'slices/loginSlice';
import { useDispatch } from 'react-redux';

const useGetUserData = () => {
    const [qrValue, setQrValue] = useState(null);
    const [myAddress, setMyAddress] = useState(null);
    const [myBalance, setMyBalance] = useState('0');
    const dispatch = useDispatch();

    const getUserData = () => {
        KlipAPI.getAddress(setQrValue, async (address) => {
            setMyAddress(address);
            const _balance = await getBalance(address);
            dispatch(setLogin({ address, balance: _balance }));
            setMyBalance(_balance);
        });
    };
    return {
        qrValue,
        myAddress,
        myBalance,
        getUserData
    };
};

export default useGetUserData;
