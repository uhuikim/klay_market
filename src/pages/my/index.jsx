import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const My = () => {
    const { address, balance } = useSelector(
        (state) => ({
            address: state.login.address,
            balance: state.login.balance
        }),
        shallowEqual
    );
    return (
        <div>
            <p>주소 : {address}</p>
            <p>잔액 : {balance}</p>
        </div>
    );
};

export default My;
