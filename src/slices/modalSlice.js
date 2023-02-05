import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    message: ''
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
        }
    }
});

export const { setOpen, setClose } = modalSlice.actions;

export default modalSlice.reducer;
