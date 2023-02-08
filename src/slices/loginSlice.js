import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false,
    address: '',
    balance: ''
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state, { payload }) => {
            state.isLogin = true;
            state.address = payload.address;
            state.balance = payload.balance;
        },
        setLogout: (state) => {
            state.isLogin = false;
        }
    }
});

export const { setLogin, setLogout } = loginSlice.actions;

export default loginSlice.reducer;
