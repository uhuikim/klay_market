import { useState } from 'react';
import * as KlipAPI from 'api/klipApi';
import { getBalance } from 'api/caverApi';
import { setLogin } from 'slices/loginSlice';
import { useDispatch } from 'react-redux';

const useGetUserData = () => {
    const [myAddress, setMyAddress] = useState(null);
    const [myBalance, setMyBalance] = useState('0');
    const dispatch = useDispatch();

    const getUserData = () => {
        KlipAPI.getAddress(async (address) => {
            setMyAddress(address);
            const _balance = await getBalance(address);
            dispatch(setLogin({ address, balance: _balance }));
            setMyBalance(_balance);
        });
    };
    return {
        myAddress,
        myBalance,
        getUserData
    };
};

export default useGetUserData;
