import { gaslessTokensTransfer, gaslessSingleTokenTransfer } from "./gasless/script";
import { nativeTokenTransfer, tokensTransfer } from "./nongasless/script";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  // await tokensTransfer();
//  await gaslessTokensTransfer();
  await gaslessSingleTokenTransfer();
  // await nativeTokenTransfer();
}

main();
