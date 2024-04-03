import { ethers } from "ethers";
import { crossChainInteraction } from "./api";
import { TxnData } from "./api/type";
import { BASE_RPC_URL, PRIVATE_KEY } from "../constants";

const provider = new ethers.JsonRpcProvider(BASE_RPC_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

async function main() {
    let data: TxnData = {
        success: false,
        data: {
            approvalTxs: [],
            executionTxs: []
        }
    };

    try {
        data = await crossChainInteraction();
        console.log(' data ', data);
    } catch (error) {
        console.error(' error ', error);
    }

    if (data.success) {
        let approvalTxs = data.data.approvalTxs;
        let approvalTxsLength = approvalTxs.length;

        for (let i = 0; i < approvalTxsLength; i++) {
            let approvalTx = approvalTxs[i];
            let txData = {
                to: approvalTx.target,
                data: approvalTx.data,
                value: BigInt(approvalTx.value)
            };

            let tx = await signer.sendTransaction(txData);
            await tx.wait();
            console.log('Tx Hash for the', i, 'th approval transaction:', tx.hash);
        }

        let executionTxs = data.data.executionTxs;
        let executionTxsLength = executionTxs.length;

        for (let i = 0; i < executionTxsLength; i++) {
            let executionTx = executionTxs[i];
            let txData = {
                to: executionTx.target,
                data: executionTx.data,
                value: BigInt(executionTx.value)
            };

            let tx = await signer.sendTransaction(txData);
            await tx.wait();
            console.log('Tx Hash for the', i, 'th execution transaction:', tx.hash);
        }
    } else {
        console.error("Transaction data is not valid")
    }
}

main();