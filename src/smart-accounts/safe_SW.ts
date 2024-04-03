import { ethers } from "ethers";
import { Wallets, WALLET_TYPE } from "@aarc-xyz/wallets";
import { MUMBAI_RPC_URL, PRIVATE_KEY, ChainID } from "../constants";


let provider = new ethers.JsonRpcProvider(MUMBAI_RPC_URL);
let signer = new ethers.Wallet(PRIVATE_KEY, provider);
let eoaAddress = signer.address;

let aarcSDK = new Wallets(
    ChainID.MUMBAI,
    MUMBAI_RPC_URL
);

/**
 * Function to fetch the Safe Smart Wallets associated with the `eoaAddress`, and  deploy and transfer native tokens to the Safe Smart Wallet.
 */

async function SafeSW() {

    try {
        // get all the smart wallets associated with the eoaAddress
        const smartWalletAddresses = await aarcSDK.getSmartWalletAddresses(
            WALLET_TYPE.SAFE,
            eoaAddress
        );
        console.log(' smartWalletAddresses ', smartWalletAddresses);

    } catch (error) {
        console.error(' error ', error);
    }

    try {
        // deploy and transfer native tokens to the Safe Smart Wallet
        const response = await aarcSDK.deployWallet({
            walletType: WALLET_TYPE.SAFE,
            owner: eoaAddress,
            signer: signer,
            deploymentWalletIndex: 0, // Change the index to the index of the SA
        });
        console.log("Transfer and Deploy Response: ", response);
    } catch (error) {
        console.error(' error ', error);
    }
}

// to run this function: `npm run safeSW`
SafeSW();