import { expect, test } from 'vitest'
import { walletClient, publicClient } from '../../../_test/utils'
import { base } from '@roninjin10/rollup-chains'
import { simulateDepositETH } from './simulateDepositETH'
import { writeContract } from 'viem/actions'
import { accounts } from '../../../_test/constants'

test('default', async () => {
  const { request } = await simulateDepositETH(publicClient, {
    args: {
      gasLimit: 100000n,
      data: '0x',
    },
    value: 1n,
    toChain: base,
    account: accounts[0].address,
  })
  expect(request).toBeDefined()
  expect(await writeContract(walletClient, request)).toBeDefined()
})
