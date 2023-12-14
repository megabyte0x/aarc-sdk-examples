import { gaslessTokensTransfer, gaslessSingleTokenTransfer } from "./gasless/script";
import { allTokensTransfer, tokensTransfer, nativeTokenTransfer, nativeTransferDeployWallet } from "./nongasless/script";
import { biconomyWallet } from "./nongasless/biconomy";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  await nativeTransferDeployWallet();
  // await tokensTransfer();
//  await gaslessTokensTransfer();
  // await allTokensTransfer();
  // await gaslessSingleTokenTransfer();
  // await nativeTokenTransfer();
  // await biconomyWallet();
}

main();
