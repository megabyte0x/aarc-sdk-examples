import { ethers, BigNumber } from "ethers";
import { Migrator, WALLET_TYPE } from "@aarc-xyz/migrator";
import { MUMBAI_RPC_URL, PRIVATE_KEY, AARC_API_KEY, ChainID } from "../constants";


let provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL);
let signer = new ethers.Wallet(PRIVATE_KEY, provider);
let eoaAddress = signer.address;

let aarcSDK = new Migrator({
    rpcUrl: MUMBAI_RPC_URL,
    chainId: ChainID.MUMBAI,
    apiKey: AARC_API_KEY,
});

/**
 * Function to fetch the ZeroDev Smart Wallets associated with the `eoaAddress`, and  deploy and transfer native tokens to the ZeroDev Smart Wallet.
 */

async function ZeroDevSW() {

    try {
        // get all the smart wallets associated with the eoaAddress
        const smartWalletAddresses = await aarcSDK.getSmartWalletAddresses(
            WALLET_TYPE.ZERODEV_KERNEL,
            eoaAddress
        );
        console.log(' smartWalletAddresses ', smartWalletAddresses);

    } catch (error) {
        console.error(' error ', error);
    }

    try {
        const reponse = await aarcSDK.transferNativeAndDeploy({
            walletType: WALLET_TYPE.ZERODEV_KERNEL,
            owner: eoaAddress,
            receiver: "0xa1A6dd310A45C4EDB53BF6512317093F820cbA65", //Change the receiver address to the SA address
            signer: signer,
            deploymentWalletIndex: 0, // Change the index to the index of the SA
            amount: BigNumber.from("10000")._hex // Change the string to the amount you want to transfer
        });
        console.log("Transfer and Deploy Response: ", reponse);
    } catch (error) {
        console.error(' error ', error);
    }
}

// to run this function: `npm run zeroDevSW`
ZeroDevSW();