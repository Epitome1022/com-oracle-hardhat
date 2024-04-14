import { useEthers } from '@usedapp/core'
import { Contract, ethers } from 'ethers'
import { useMemo } from 'react'
import { useContractConfig } from './useContractConfig'
import { JsonRpcProvider, Web3Provider, BaseProvider, getDefaultProvider } from '@ethersproject/providers'

export function useContract<T extends Contract = Contract>(
  name: string
): T | null {
  const { library } = useEthers()

  const contract = useContractConfig(name)
  
  return useMemo(() => {
    if (!library) return null
    // if ((library instanceof JsonRpcProvider)) {
    // if (!(library instanceof JsonRpcProvider)) {
    //   return null
    // }
    console.log(contract);
    if (typeof contract === 'object' && contract !== null && 'address' in contract) {
      return new ethers.Contract(
        contract.address,
        contract.abi,
        (library as JsonRpcProvider).getSigner()
      ) as T
    }
    else return null
  }, [contract, library])
}
