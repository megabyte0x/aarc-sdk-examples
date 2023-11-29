import { BigNumber, ethers } from "ethers";
import { AarcSDK } from "aarc-sdk";
import { RPC_URL, PRIVATE_KEY, API_KEY, GELATO_API_KEY, nativeTokenAddress, tokenAddresses, TokenName, ChainID, nativeTokenAddresses } from "../constants";
import { ERC20_ABI } from "../abis/erc20.abi";



export const nonGaslessFlow = async () => {
    let provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    let signer = new ethers.Wallet(PRIVATE_KEY, provider);
    let eoaAddress = signer.address;
    const chainId: ChainID = (await provider.getNetwork()).chainId
    console.log(' chainId ', chainId);


    let aarcSDK = new AarcSDK({
        rpcUrl: RPC_URL,
        chainId,
        apiKey: API_KEY,
    });

    let balances = await aarcSDK.fetchBalances(eoaAddress);
    console.log(balances);

    if (balances.data && balances.data.length > 0) {
        const token = balances.data.find(token => {
            return token.token_address.toLowerCase() === nativeTokenAddresses[chainId].toLowerCase()
        })
        console.log('token ', token);
        
        if (!token || BigNumber.from(token.balance).lte(BigNumber.from(0))) {
            console.log('insufficient balance for transaction')
            console.log('balance is ', token?.balance.toNumber())
            console.log('please send some token to proceed further')
            return
        }
        else {
            for (const tokenName in tokenAddresses[chainId]) {
                console.log(' tokenName ', tokenName);
                const { address, decimals } = tokenAddresses[chainId][tokenName as keyof typeof TokenName];
                const token = balances.data.find(token => {
                    return token.token_address.toLowerCase() === address.toLowerCase()
                })
                console.log('token ', token);
                
                if (!token || BigNumber.from(token.balance).lte(BigNumber.from(0))) {
                    const tokenContract = new ethers.Contract(
                        address,
                        ERC20_ABI,
                        signer,
                    );
                    try {
                        await tokenContract.mint(eoaAddress, BigNumber.from(1000).mul(10).pow(decimals))
                        console.log(tokenName, 'token minted successfully');
                        
                    } catch (error) {
                        console.log('error minting token', error)
                    }
                }
            }
            const resultSet = await aarcSDK.executeMigration({
                senderSigner: signer,
                receiverAddress:"0x786E6045eacb96cAe0259cd761e151b68B85bdA7",
                transferTokenDetails:[
                  {tokenAddress:tokenAddresses[chainId].USDA1.address,amount:BigNumber.from("100000000")},
                  {tokenAddress:tokenAddresses[chainId].USDB.address,amount:BigNumber.from("100000000")},
                  {tokenAddress:"0xd2a94832CF0a4c1A793f630264E984389C3EF48F",amount:BigNumber.from("100000000")},
                  {tokenAddress:"0x022e292b44b5a146f2e8ee36ff44d3dd863c915c",amount:BigNumber.from("20000000000000000")},
                  {tokenAddress:tokenAddresses[chainId].USDA2.address,amount:BigNumber.from("500000000")},
                  {tokenAddress:tokenAddresses[chainId].USDC.address,amount:BigNumber.from("30000000000000000")},
                ]
              })
            console.log('ResultSet ', resultSet);
        }
    }else{
        console.log('insufficient native balance for transaction')
        console.log('please send some token to proceed further')
        return
    }
}

nonGaslessFlow()