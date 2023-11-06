import { ethers } from "ethers";
import {AarcSDK} from "AarcSDK/src";
import { RPC_URL, PRIVATE_KEY, API_KEY, GELATO_API_KEY } from "../constants";

export const gaslessTokensTransfer = async () => {
  let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);  

  let aarcSDK = new AarcSDK.default({
    signer: signer,
    apiKey: API_KEY,
  });

  await aarcSDK.init();

  // let balances = await aarcSDK.fetchBalances([]);
  // console.log(balances);

  let safes = await aarcSDK.getAllSafes();
  console.log(safes);

  await aarcSDK.executeMigrationGasless({
    scwAddress:"0x786E6045eacb96cAe0259cd761e151b68B85bdA7",
    tokenAndAmount:[
      {tokenAddress:"0xf4Ca1a280ebCcdaEBf80E3C128e55DE01fAbD893",amount:"100000000000"},
      {tokenAddress:"0x022e292b44b5a146f2e8ee36ff44d3dd863c915c",amount:"2000000000000000000"},
      {tokenAddress:"0xaff4481d10270f50f203e0763e2597776068cbc5",amount:"3000000000000000000"},
    ],
    gelatoApiKey: GELATO_API_KEY,
  })
}
