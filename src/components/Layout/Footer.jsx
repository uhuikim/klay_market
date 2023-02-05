import { css } from '@emotion/react';
import React from 'react';
import { container } from 'styles/common/layout';
import { palette } from 'styles/palette';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import Divider from 'components/common/Divider';
const Footer = () => {
    return (
        <div css={footer}>
            <div css={container}>
                <Divider />
                <p css={copyRight}> Copyright © 2023 All Rights Reserved by Kim Uhui.</p>
                <ul css={snsList}>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/uhui-kim-43aa67212/"
                            target="_blank"
                            rel="noopener noreferrer"
                            css={snsLink}
                        >
                            <FaLinkedinIn size={20} />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://github.com/uhuikim"
                            target="_blank"
                            rel="noopener noreferrer"
                            css={snsLink}
                        >
                            <FaGithub size={20} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;

const footer = css`
    display: flex;
    margin-top: auto;
    width: 100%;
    justify-content: center;
`;

const copyRight = css`
    color: ${palette.gray300};
    text-align: center;
    margin-top: 2rem;
    font-size: 14px;
`;

const snsList = css`
    display: flex;
    padding: 1.3rem 0 1.7rem 0;
    justify-content: center;
    & > li {
        padding: 0 0.4rem;
    }
`;

const snsLink = css`
    & > svg {
        color: ${palette.gray300};
    }
`;
