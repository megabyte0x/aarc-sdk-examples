type TxnData = {
    success: boolean;
    data: {
        approvalTxs: ApprovalTx[];
        executionTxs: ExecutionTx[];
    }
}

type ApprovalTx = {
    target: string;
    data: string;
    value: string;
    length: number;
}

type ExecutionTx = {
    target: string;
    data: string;
    value: string;
    length: number;
}

export type { TxnData, ApprovalTx, ExecutionTx }; 