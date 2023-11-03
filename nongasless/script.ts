import { ethers } from "ethers";
import {AarcSDK} from "AarcSDK";
import config from "../config.json";

export const tokensTransfer = async (
  recipientAddress: string
) => {
  let provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  let signer = new ethers.Wallet(config.privateKey, provider);

  let aarcSDK = new AarcSDK({
    signer: signer,
    apiKey: config.apiKey,
  });

  let balances = await aarcSDK.fetchBalances();
  console.log(balances);
}
