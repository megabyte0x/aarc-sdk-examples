import { ethers } from "ethers";
import { AarcSDK } from "aarc-sdk";
import { RPC_URL, PRIVATE_KEY, API_KEY } from "../constants";

export const biconomyWallet = async () => {
  let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);  
  let eoaAddress = signer.address;

  let aarcSDK = new AarcSDK({
    rpcUrl: RPC_URL,
    chainId: 5,
    apiKey: API_KEY,
  });

  let biconomyWallets = await aarcSDK.getAllBiconomySCWs(eoaAddress);
  console.log(biconomyWallets);

  let biconomyWalletAddress = await aarcSDK.generateBiconomySCW(signer);
  console.log(biconomyWalletAddress);
}
