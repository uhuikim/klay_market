import React from 'react';
import { IoClose } from 'react-icons/io5';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setClose } from 'slices/modalSlice';
import { css } from '@emotion/react';
import QRCode from 'qrcode.react';

const Modal = () => {
    const dispatch = useDispatch();
    const { isOpen, message, qrValue } = useSelector(
        (state) => ({
            isOpen: state.modal.isOpen,
            message: state.modal.message,
            qrValue: state.modal.qrValue
        }),
        shallowEqual
    );

    return (
        isOpen && (
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
                    <h3 css={title}>{message}</h3>
                    <div css={qrWrap}>
                        {Boolean(qrValue) && qrValue !== 'DEFAULT' && (
                            <QRCode value={qrValue} size={150} />
                        )}
                    </div>
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

const title = css`
    font-size: 1.3rem;
    font-weight: 600;
    word-break: break-all;
    white-space: pre;
    text-align: center;
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

const qrWrap = css`
    margin-top: 1rem;
`;

export default Modal;
