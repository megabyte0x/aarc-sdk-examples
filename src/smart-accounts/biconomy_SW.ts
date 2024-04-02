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
 * Function to fetch the Biconomy Smart Wallets associated with the `eoaAddress`, and  deploy and transfer native tokens to the Biconomy Smart Wallet.
 */

async function BiconomySW() {

    try {
        // get all the smart wallets associated with the eoaAddress
        const smartWalletAddresses = await aarcSDK.getSmartWalletAddresses(
            WALLET_TYPE.BICONOMY,
            eoaAddress
        );
        console.log(' smartWalletAddresses ', smartWalletAddresses);

    } catch (error) {
        console.error(' error ', error);
    }

    try {
        const response = await aarcSDK.deployWallet({
            walletType: WALLET_TYPE.BICONOMY,
            owner: eoaAddress,
            signer: signer,
            deploymentWalletIndex: 0, // Change the index to the index of the SA
        });
        console.log("Transfer and Deploy Response: ", response);
    } catch (error) {
        console.error(' error ', error);
    }
}

// to run this function: `npm run biconomySW`
BiconomySW();