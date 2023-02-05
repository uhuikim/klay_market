import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { container } from 'styles/common/layout';
import { palette } from 'styles/palette';

import { FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setOpen } from 'slices/modalSlice';

const Header = () => {
    const [isLogin, setLogin] = useState(false);
    const dispatch = useDispatch();
    const handleModal = () => {
        dispatch(setOpen({ message: '로그인 하기' }));
    };
    return (
        <div css={header}>
            <div css={container}>
                <div css={wrap}>
                    <h1 css={logo}>
                        <Link to="/">Logo</Link>
                    </h1>
                    <nav css={navStyle}>
                        <ul>
                            <li>a</li>
                        </ul>

                        <div>
                            {!isLogin ? (
                                <button
                                    type="button"
                                    css={signButton}
                                    onClick={handleModal}
                                >
                                    Sign In
                                </button>
                            ) : (
                                <Link to="/my">
                                    <button type="button" css={profileButton}>
                                        <FaUser size={18} />
                                    </button>
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;

const header = css`
    display: flex;
    height: 70px;
    justify-content: center;
    width: 100%;
    box-shadow: rgb(21 22 25 / 5%) 0px 4px 8px;
`;
const wrap = css`
    display: flex;
    height: 100%;
    align-items: center;
`;

const navStyle = css`
    display: flex;
    flex: 1;
    margin-left: 2rem;
    justify-content: space-between;
    align-items: center;
`;

const logo = css`
    font-weight: bold;
    font-size: 23px;
`;

const signButton = css`
    border: 1px solid #aaacb6;
    padding: 0.6rem 1.25rem;
    cursor: pointer;
    border-radius: 20px;
    background: ${palette.white};
`;

const profileButton = css`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid ${palette.gray200};
    background: ${palette.white};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    & > svg {
        color: ${palette.gray300};
    }
`;
