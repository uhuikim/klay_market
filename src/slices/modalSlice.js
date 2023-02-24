import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_ADDRESS } from 'constants';

const initialState = {
    isOpen: false,
    message: '',
    qrValue: DEFAULT_ADDRESS
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpen: (state, { payload }) => {
            state.isOpen = true;
            state.message = payload.message;
        },
        setClose: (state) => {
            state.isOpen = false;
            state.qrValue = DEFAULT_ADDRESS;
        },
        setQrValue: (state, { payload }) => {
            state.qrValue = payload.qrValue;
        }
    }
});

export const { setOpen, setClose, setQrValue } = modalSlice.actions;

export default modalSlice.reducer;
