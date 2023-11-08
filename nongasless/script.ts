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

  await aarcSDK.init();

  let balances = await aarcSDK.fetchBalances();
  console.log(balances);

  let safes = await aarcSDK.getAllSafes();
  console.log(safes);

  await aarcSDK.executeMigration({
    scwAddress:"0x786E6045eacb96cAe0259cd761e151b68B85bdA7",
    tokenAndAmount:[
      {tokenAddress:"0xbb8dB535d685F2742D6e84EC391c63e6a1Ce3593",amount:"1000000000"},
      {tokenAddress:"0xba62bcfcaafc6622853cca2be6ac7d845bc0f2dc",amount:"10000000000000"},
      {tokenAddress:"0x022e292b44b5a146f2e8ee36ff44d3dd863c915c",amount:"20000000000000000"},
      {tokenAddress:"0xaff4481d10270f50f203e0763e2597776068cbc5",amount:"30000000000000000"},
      {tokenAddress:"0xc6fde3fd2cc2b173aec24cc3f267cb3cd78a26b7",amount:"500000000"},
    ]
  })
}

export const nativeTokenTransfer = async () => {
  let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);  

  let aarcSDK = new AarcSDK.default({
    signer: signer,
    apiKey: API_KEY,
  });

  await aarcSDK.init();

  let balances = await aarcSDK.fetchBalances();
  console.log(balances);

  let safes = await aarcSDK.getAllSafes();
  console.log(safes);

  await aarcSDK.executeMigration({
    scwAddress:"0x786E6045eacb96cAe0259cd761e151b68B85bdA7",
    tokenAndAmount:[
      {tokenAddress:"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",amount:"10000000000000"},
      {tokenAddress:"0x022e292b44b5a146f2e8ee36ff44d3dd863c915c",amount:"20000000000000000"},
    ]
  })
}
