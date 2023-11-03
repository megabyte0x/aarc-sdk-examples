import { tokensTransfer } from "./nongasless/script";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
 await tokensTransfer();
}

main();
