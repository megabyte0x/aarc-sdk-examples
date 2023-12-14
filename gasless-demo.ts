import { Wallet, ethers, BigNumber } from 'ethers'
import { AarcSDK } from "aarc-sdk";

require("dotenv").config({ path: ".env" });

const provider = new ethers.providers.JsonRpcProvider( `${process.env.ALCHEMY_MAINNET_URL}`);
const wallet = new Wallet(process.env.PRIVATE_KEY as string || "", provider);

let receipientAddress: string = "0xF8a485A3c7F0497e5de4Dde26cbefc1465499251"
const USDCTokenAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" // USDC Proxy address

console.log(wallet.address)
const gaslessTransfer = async () => {
  const aarcSDK = new AarcSDK(
    {
      rpcUrl: `${process.env.ALCHEMY_MAINNET_URL}`,
      chainId: 137,
      apiKey: process.env.ARC_API_KEY as string,
    }
  )

  const res =  await aarcSDK.executeMigrationGasless({
        senderSigner: wallet, // ethers.signer object
        receiverAddress:receipientAddress,
        transferTokenDetails: // Optional. If not passed, the SDK will migrate all the tokens of the wallet
        [   
          {
            tokenAddress:USDCTokenAddress,
            amount: BigNumber.from(10000), // ethers.BigNumber in case of erc20 and native token
          },
        ],
        gelatoApiKey: process.env.GELATO_API_KEY as string // Use the link above to get the gelato relayer key
      })
      // Returns the response given below
      console.log(res)
      return res
}
gaslessTransfer()