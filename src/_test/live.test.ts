import { test, expect } from 'vitest'
import { Hex, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli, mainnet } from '@wagmi/chains'
import { baseGoerli } from '@roninjin10/rollup-chains'
import { walletL1OpStackActions } from '../decorators/walletL1OpStackActions'
import { publicL1OpStackActions } from '../decorators/publicL1OpStackActions'

test('correctly retrieves L2 hash', async () => {
  return
  const pk = process.env.VITE_PRIVATE_KEY
  if (!pk) {
    console.log('no private key')
    return
  }
  const account = privateKeyToAccount(pk as Hex)
  const walletClient = createWalletClient({
    account,
    chain: goerli,
    transport: http(),
  }).extend(walletL1OpStackActions)

  const depositHash = await walletClient.writeUnsafeDepositTransaction({
    toChain: baseGoerli,
    args: {
      to: account.address,
      value: 1n,
      data: '0x',
      gasLimit: 25000n,
      isCreation: false,
    },
    value: 1n,
  })

  console.log('depositHash', depositHash)

  const mainnetPublicClient = createPublicClient({
    chain: goerli,
    transport: http(),
  }).extend(publicL1OpStackActions)

  await mainnetPublicClient.waitForTransactionReceipt({ hash: depositHash })

  const l2Hash = await mainnetPublicClient.getL2HashesForDepositTx({
    l1TxHash: depositHash,
  })

  console.log('l2Hash', l2Hash)
})
