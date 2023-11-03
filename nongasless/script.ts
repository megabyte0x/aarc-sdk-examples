import { ethers } from "ethers";
import {AarcSDK} from "AarcSDK/src";
import { RPC_URL, PRIVATE_KEY, API_KEY } from "../constants";

export const tokensTransfer = async () => {
  let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);  

  let aarcSDK = new AarcSDK.default({
    signer: signer,
    apiKey: API_KEY,
  });

  let balances = await aarcSDK.fetchBalances();
  console.log(balances);
}

