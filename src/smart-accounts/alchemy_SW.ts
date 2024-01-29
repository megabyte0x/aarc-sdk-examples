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
 * Function to fetch the Alchemy Smart Wallets associated with the `eoaAddress`, and  deploy and transfer native tokens to the Alchemy Smart Wallet.
 */

async function AlchemySW() {

    try {
        // get all the smart wallets associated with the eoaAddress
        const smartWalletAddresses = await aarcSDK.getSmartWalletAddresses(
            WALLET_TYPE.ALCHEMY_SIMPLE_ACCOUNT,
            eoaAddress
        );
        console.log(' smartWalletAddresses ', smartWalletAddresses);

    } catch (error) {
        console.error(' error ', error);
    }

    try {
        const reponse = await aarcSDK.transferNativeAndDeploy({
            walletType: WALLET_TYPE.ALCHEMY_SIMPLE_ACCOUNT,
            owner: eoaAddress,
            receiver: "0x5d3848F6CDB26F2b158c19D47a0c325d30734367", //Change the receiver address to the SA address
            signer: signer,
            deploymentWalletIndex: 0, // Change the index to the index of the SA
            amount: BigNumber.from("10000")._hex // Change the string to the amount you want to transfer
        });
        console.log("Transfer and Deploy Response: ", reponse);
    } catch (error) {
        console.error(' error ', error);
    }
}

// to run this function: `npm run alchemySW`
AlchemySW();