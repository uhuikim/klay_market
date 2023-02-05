export const COUNT_CONTRACT_ADDRESS = "0xC493173278c60C04fa5f6a854fE6Dcd2ccF8548f";
export const NFT_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS; // 메인넷에 배포된 컨트랙트 (KIP17Token.sol) 주소
export const NFT_MARKET_CONTRACT_ADDRESS = process.env.REACT_APP_MARKET_CONTRACT_ADDRESS; // 메인넷에 배포된 컨트랙트 (NFTMarket.sol) 주소
export const ACCESS_KEY_ID = process.env.REACT_APP_KAS_ACCESS_KEY_ID;
export const SECRET_ACCESS_KEY = process.env.REACT_APP_KAS_SECRET_ACCESS_KEY;
export const CHAIN_ID = "8217"; // MAINNET 8217 , TESTNET 1001

//  Klip API 사용 시 필요한 정보
export const A2P_API_PREPARE_URL = "https://a2a-api.klipwallet.com/v2/a2a/prepare";
export const A2P_API_RESULT_URL = "https://a2a-api.klipwallet.com/v2/a2a/result";
export const A2P_API_REQUEST_URL = "https://klipwallet.com/?target=/a2a";
export const APP_NAME = "KLAY_NFT_MARKET";

export const DEFAULT_ADDRESS = "0x0000000000";
export const DEFAULT_QR_CODE = "DEFAULT";
