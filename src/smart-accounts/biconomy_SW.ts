import { ethers, BigNumber } from "ethers";
import { Migrator, WALLET_TYPE } from "@aarc-xyz/migrator";
import { RPC_URL, PRIVATE_KEY, API_KEY, ChainID } from "../constants";


let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
let signer = new ethers.Wallet(PRIVATE_KEY, provider);
let eoaAddress = signer.address;

let aarcSDK = new Migrator({
    rpcUrl: RPC_URL,
    chainId: ChainID.MUMBAI,
    apiKey: API_KEY,
});

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
        const reponse = await aarcSDK.transferNativeAndDeploy({
            walletType: WALLET_TYPE.BICONOMY,
            owner: eoaAddress,
            receiver: "0xcba2d1f7522757f4f1b2e1f7ce54612c61fbd366", //Change the receiver address to the SA address
            signer: signer,
            deploymentWalletIndex: 0, // Change the index to the index of the SA
            amount: BigNumber.from("10000")._hex // Change the string to the amount you want to transfer
        });
        console.log("Transfer and Deploy Response: ", reponse);
    } catch (error) {
        console.error(' error ', error);
    }
}

// to run this function: `npm run biconomySW`
BiconomySW();