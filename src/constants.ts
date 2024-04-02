import * as dotenv from 'dotenv';
dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";
export const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
export const AARC_API_KEY = process.env.AARC_API_KEY || "";


export enum ChainID {
    GOERLI = 5,
    MUMBAI = 80001,
    SEPOLIA = 11155111
}

interface TokenInfo {
    address: string;
    decimals: number;
}

export enum TokenName {
    USDA1 = 'USDA1',
    USDA2 = 'USDA2',
    USDB = 'USDB',
    USDC = 'USDC'
}

export const nativeTokenAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export interface TokenAddresses {
    [ChainID.GOERLI]: Record<TokenName, TokenInfo>;
    [ChainID.MUMBAI]: Record<TokenName, TokenInfo>;
}

export const tokenAddresses: TokenAddresses = {
    [ChainID.GOERLI]: {
        [TokenName.USDA1]: { address: '0xbb8dB535d685F2742D6e84EC391c63e6a1Ce3593', decimals: 6 },
        [TokenName.USDA2]: { address: '0xf4Ca1a280ebCcdaEBf80E3C128e55DE01fAbD893', decimals: 6 },
        [TokenName.USDB]: { address: '0x2055b06Db421F17C19C655Fd4A1c325e8514aF67', decimals: 8 },
        [TokenName.USDC]: { address: '0xd2a94832CF0a4c1A793f630264E984389C3EF48F', decimals: 18 }
    },
    [ChainID.MUMBAI]: {
        [TokenName.USDA1]: { address: '0xbB8bb7E16d8F03969d49fd3ED0efd13E65C8f5B5', decimals: 6 },
        [TokenName.USDA2]: { address: '0x203fa10731d98444fD59DA46705321080bA99824', decimals: 6 },
        [TokenName.USDB]: { address: '0x2D6d85C69e92F3008d9f06Ddf8Bac054783687B4', decimals: 8 },
        [TokenName.USDC]: { address: '0xb18059aA6483bA71D6d3DfAbaD53616b00EA2ABA', decimals: 18 }
    }
};

export const nativeTokenAddresses = {
    [ChainID.GOERLI]: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    [ChainID.MUMBAI]: '0x0000000000000000000000000000000000001010'
}