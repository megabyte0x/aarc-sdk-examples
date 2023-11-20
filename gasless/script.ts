import { BigNumber, ethers } from "ethers";
import {AarcSDK} from "aarc-sdk";
import { RPC_URL, PRIVATE_KEY, API_KEY, GELATO_API_KEY } from "../constants";

export const gaslessTokensTransfer = async () => {
  let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);  
  let eoaAddress = signer.address;

  let aarcSDK = new AarcSDK({
    rpcUrl: RPC_URL,
    chainId: 5,
    apiKey: API_KEY,
  });

  let balances = await aarcSDK.fetchBalances(eoaAddress);
  console.log(balances);

  let safes = await aarcSDK.getAllSafes(eoaAddress);
  console.log(safes);

  await aarcSDK.executeMigrationGasless({
    senderSigner: signer,
    receiverAddress:"0x786E6045eacb96cAe0259cd761e151b68B85bdA7",
    transferTokenDetails:[
      {tokenAddress:"0xbb8dB535d685F2742D6e84EC391c63e6a1Ce3593",amount:BigNumber.from("100000000")},
      {tokenAddress:"0x2055b06db421f17c19c655fd4a1c325e8514af67",amount:BigNumber.from("20000000000000000")},
      {tokenAddress:"0xf4ca1a280ebccdaebf80e3c128e55de01fabd893",amount:BigNumber.from("500000000")},
      {tokenAddress:"0x932ca55b9ef0b3094e8fa82435b3b4c50d713043",tokenIds:["28507"]},
    ],
    gelatoApiKey: GELATO_API_KEY,
  })
}

export const gaslessSingleTokenTransfer = async () => {
  let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  let signer = new ethers.Wallet(PRIVATE_KEY, provider);  
  let eoaAddress = signer.address;

  let aarcSDK = new AarcSDK({
    rpcUrl: RPC_URL,
    chainId: 4,
    apiKey: API_KEY,
  });

  let balances = await aarcSDK.fetchBalances(eoaAddress, []);
  console.log(balances);

  let safes = await aarcSDK.getAllSafes(eoaAddress);
  console.log(safes);

  await aarcSDK.executeMigrationGasless({
    senderSigner: signer,
    receiverAddress:"0x786E6045eacb96cAe0259cd761e151b68B85bdA7",
    transferTokenDetails:[
      {tokenAddress:"0xaff4481d10270f50f203e0763e2597776068cbc5",amount:BigNumber.from("300000000000000")},
    ],
    gelatoApiKey: GELATO_API_KEY,
  })
}
