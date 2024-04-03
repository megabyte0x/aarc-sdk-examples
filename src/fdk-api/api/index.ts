import { parseEther } from "ethers";
import { ApprovalTx, ExecutionTx, TxnData } from "./type";
import { AARC_API_KEY } from "../../constants";

const BASE_URL = "https://bridge-swap.aarc.xyz";

// Base
const FROM_CHAIN_ID = "8453";

// ETH on Base
const FROM_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

// Polygon PoS
const TO_CHAIN_ID = "137";

// USDC on Polygon PoS
const TO_TOKEN_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

/**
 * NEED TO CHANGE THE VALUE.
 * It should be more near to $11 worth of ETH in the current market.
 */
const ETH_AMOUNT = parseEther("0.003").toString();

// User intiating the transaction
const USER_ADDRESS = "0x2D2E4c335EEE674Bd8F2EB3622E4156EbAbC864d";

// This is a Simple NFT Contract on Polygon PoS 
const RECIPIENT_ADDRESS = "0x8FBC953cbbd11E2acF11EF3ed8B81109A06A6aa8";

/**
 * NEED TO CHANGE THE VALUE.
 * This calldata will transfer 10 USDC to the `RECIPIENT_ADDRESS` and mint an NFT to the `0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174` address on the Polygon PoS chain 
 */
const DESTINATION_PAYLOAD = "40c10f190000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000989680"

const DESTINATION_GAS_LIMIT = "1000000";


export async function crossChainInteraction(): Promise<TxnData> {

    const queryParameters = new URLSearchParams({
        fromChainId: FROM_CHAIN_ID,
        toChainId: TO_CHAIN_ID,
        fromTokenAddress: FROM_TOKEN_ADDRESS,
        toTokenAddress: TO_TOKEN_ADDRESS,
        routeType: "Value",
        fromAmount: ETH_AMOUNT,
        userAddress: USER_ADDRESS,
        recipient: RECIPIENT_ADDRESS,
        destinationGasLimit: DESTINATION_GAS_LIMIT,
        destinationPayload: DESTINATION_PAYLOAD
    })

    const endPoint = `${BASE_URL}/deposit-calldata?${queryParameters}`;
    console.log(endPoint);

    let finalResponse: TxnData = {
        success: false,
        data: {
            approvalTxs: [],
            executionTxs: []
        }
    };
    let response;
    let responseInJson;

    try {
        response = await fetch(endPoint, {
            method: "GET",
            headers: {
                "x-api-key": AARC_API_KEY,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.error(e)
    }

    if (response) {
        try {
            responseInJson = await response.json();

            if (responseInJson.success) {

                let approvalTxs = responseInJson.data.approvalTxs;
                let approvalTxsLength = approvalTxs.length;
                for (let i = 0; i < approvalTxsLength; i++) {
                    let approvalTx: ApprovalTx = {
                        target: approvalTxs[i].approvalTokenAddress,
                        data: approvalTxs[i].callData,
                        value: approvalTxs[i].minimumApprovalAmount,
                        length: approvalTxsLength
                    };
                    finalResponse.data.approvalTxs.push(approvalTx);
                }


                let executionTxs = responseInJson.data.executionTxs;
                let executionTxsLength = executionTxs.length;
                for (let i = 0; i < executionTxsLength; i++) {
                    let executionTx: ExecutionTx = {
                        target: executionTxs[i].txTarget,
                        data: executionTxs[i].txData,
                        value: executionTxs[i].value,
                        length: executionTxsLength
                    };
                    finalResponse.data.executionTxs.push(executionTx);
                }

                finalResponse.success = true;
            } else {
                console.error("Error in fetching")
            }
        } catch (e) {
            console.error(e)
        }
    }
    return finalResponse;
}
