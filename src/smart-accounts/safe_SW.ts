import { ethers, BigNumber } from "ethers";
import { Migrator, WALLET_TYPE } from "@aarc-xyz/migrator";
import { SEPOLIA_RPC_URL, PRIVATE_KEY, API_KEY, ChainID } from "../constants";


let provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);
let signer = new ethers.Wallet(PRIVATE_KEY, provider);
let eoaAddress = signer.address;

let aarcSDK = new Migrator({
    rpcUrl: SEPOLIA_RPC_URL,
    chainId: ChainID.SEPOLIA,
    apiKey: API_KEY,
});

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
        const response = await aarcSDK.transferNativeAndDeploy({
            walletType: WALLET_TYPE.SAFE,
            owner: eoaAddress,
            receiver: "0x1a6e27BE6d0902eBd2D6FE533790c6A06A892F63", //Change the receiver address to the SA address
            signer: signer,
            deploymentWalletIndex: 0, // Change the index to the index of the SA
            amount: BigNumber.from("10000")._hex // Change the string to the amount you want to transfer
        });
        console.log("Transfer and Deploy Response: ", response);
    } catch (error) {
        console.error(' error ', error);
    }
}

// to run this function: `npm run safeSW`
SafeSW();