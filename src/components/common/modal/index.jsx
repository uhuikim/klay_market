import React from 'react';
import { IoClose } from 'react-icons/io5';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setClose } from 'slices/modalSlice';
import { css } from '@emotion/react';
import QRCode from 'qrcode.react';

const Modal = ({ qrValue, modalText = 'Klip App 또는 KakaoTalk을 이용해 주세요' }) => {
    const dispatch = useDispatch();
    const { isOpen, message } = useSelector(
        (state) => ({
            isOpen: state.modal.isOpen,
            message: state.modal.message
        }),
        shallowEqual
    );
    const { address } = useSelector(
        (state) => ({
            address: state.login.address
        }),
        shallowEqual
    );

    return (
        isOpen &&
        !address && (
            <div css={modalContainer}>
                <div css={container} id="popup-modal" tabIndex={-1}>
                    <button
                        css={closeButton}
                        type="button"
                        data-modal-toggle="popup-modal"
                        onClick={() => dispatch(setClose())}
                    >
                        <IoClose size={18} />
                    </button>
                    {Boolean(qrValue) && <QRCode value={qrValue} size={150} />}
                    <h3 css={description}>{message}</h3>
                </div>
            </div>
        )
    );
};

const modalContainer = css`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;

const container = css`
    position: relative;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    background-color: white;
`;

const description = css`
    font-size: 1rem;
    font-weight: 600;
    word-break: break-all;
`;

const closeButton = css`
    position: absolute;
    top: 10px;
    right: 10px;
    border: 0px;
    background-color: transparent;
    color: black;
    cursor: pointer;
`;

export default Modal;
