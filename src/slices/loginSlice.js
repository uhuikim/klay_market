import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: false
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLogin = true;
        },
        setLogout: (state) => {
            state.isLogin = false;
        }
    }
});

export const { setLogin, setLogout } = loginSlice.actions;

export default loginSlice.reducer;
