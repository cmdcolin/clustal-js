/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { parseVersion, parseBlock } from '../src/util'
test('versions', () => {
  expect(parseVersion('CLUSTAL (1.2.3)')).toEqual('1.2.3')
  expect(parseVersion('CLUSTALW (1.2.3)')).toEqual('1.2.3')
  expect(parseVersion('CLUSTAL W(1.2.3)')).toEqual('1.2.3')
  expect(parseVersion('CLUSTAL W (1.2.3)')).toEqual('1.2.3')
  expect(parseVersion('CLUSTAL 1.2.3')).toEqual('1.2.3')
  expect(
    parseVersion('CLUSTAL multiple sequence alignment by MUSCLE (3.8)'),
  ).toEqual('3.8')
  expect(
    parseVersion('CLUSTAL format alignment by MAFFT FFT-NS-i (v7.397)'),
  ).toEqual('7.397')
})

test('block', () => {
  const b = `sp|P69905|HBA_HUMAN       MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHG	60
                          * *:  ::: : : *.*:. :.   *:*:***:* .:* :********:  ****::.**

`
  const iter = b.split('\n')[Symbol.iterator]()
  const ret = parseBlock(iter)
  expect(ret).toBeTruthy()
  expect(ret!.consensus.length).toEqual(60)
  expect(ret!.seqs[0].length).toEqual(60)
})
test('end block', () => {
  const b = `sp|P69905|HBA_HUMAN       AVHASLDKFLASVSTVLTSKYR	142
                           .**: ****: ** ***.***
`
  const iter = b.split('\n')[Symbol.iterator]()
  const ret = parseBlock(iter)
  expect(ret).toBeTruthy()
  expect(ret!.consensus.length).toEqual(22)
  expect(ret!.seqs[0].length).toEqual(22)
})
test('empty consensus with trimmed line', () => {
  const b = `sp|P69905|HBA_HUMAN       AVHASLDKFLASVSTVLTSKYR	142

`
  const iter = b.split('\n')[Symbol.iterator]()
  const ret = parseBlock(iter)
  expect(ret).toBeTruthy()
  expect(ret!.consensus.length).toEqual(22)
  expect(ret!.seqs[0].length).toEqual(22)
})
test('empty consensus with spaces', () => {
  const b = `sp|P69905|HBA_HUMAN       AVHASLDKFLASVSTVLTSKYR	142

`
  const iter = b.split('\n')[Symbol.iterator]()
  const ret = parseBlock(iter)
  expect(ret).toBeTruthy()
  expect(ret!.consensus.length).toEqual(22)
  expect(ret!.seqs[0].length).toEqual(22)
})

test('consensus line had trailing whitespace clipped', () => {
  const b = `sp|P69905|HBA_HUMAN       AVHASLDKFLASVSTVLTSKYR	142
sp|P01942|HBA_MOUSE       AVHASLDKFLASVSTVLTSKYR	142
sp|P13786|HBAZ_CAPHI      DAHAAWDKFLSIVSGVLTEKYR	142
                           .**: ****: ** ***.
`
  const iter = b.split('\n')[Symbol.iterator]()
  const ret = parseBlock(iter)
  expect(ret).toBeTruthy()
  expect(ret!.consensus.length).toEqual(22)
  expect(ret!.seqs[0].length).toEqual(22)
})
