import { Chain, type PublicClient, Transport } from 'viem'
import {
  GetL2HashesForDepositTxParamters,
  GetL2HashesForDepositTxReturnType,
  getL2HashesForDepositTx,
} from '../actions/public/L1/getL2HashesForDepositTx'
import {
  simulateDepositETH,
  SimulateDepositETHParameters,
  SimulateDepositETHReturnType,
} from '../actions/public/L1/simulateDepositETH'
import {
  simulateDepositERC20,
  SimulateDepositERC20Parameters,
  SimulateDepositERC20ReturnType,
} from '../actions/public/L1/simulateDepositERC20'
import {
  GetOutputForL2BlockParameters,
  GetOutputForL2BlockReturnType,
  getOutputForL2Block,
} from '../actions/public/L1/getOutputForL2Block'

export type PublicL1OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
> = {
  getL2HashesForDepositTx: (
    args: GetL2HashesForDepositTxParamters,
  ) => Promise<GetL2HashesForDepositTxReturnType>
  simulateDepositETH: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: SimulateDepositETHParameters<TChain, TChainOverride>,
  ) => Promise<SimulateDepositETHReturnType<TChain, TChainOverride>>
  simulateDepositERC20: <
    TChainOverride extends Chain | undefined = Chain | undefined,
  >(
    args: SimulateDepositERC20Parameters<TChain, TChainOverride>,
  ) => Promise<SimulateDepositERC20ReturnType<TChain, TChainOverride>>
  getOutputForL2Block: (
    args: GetOutputForL2BlockParameters,
  ) => Promise<GetOutputForL2BlockReturnType>
}

export function publicL1OpStackActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(
  client: PublicClient<TTransport, TChain>,
): PublicL1OpStackActions<TTransport, TChain> {
  return {
    getL2HashesForDepositTx: (args) => getL2HashesForDepositTx(client, args),
    simulateDepositETH: (args) => simulateDepositETH(client, args),
    simulateDepositERC20: (args) => simulateDepositERC20(client, args),
    getOutputForL2Block: (args) => getOutputForL2Block(client, args),
  }
}
