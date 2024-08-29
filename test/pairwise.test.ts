import { test, expect } from 'vitest'
import { parsePairwise } from '../src'
import * as fs from 'fs'

test('pairwise', async () => {
  const ret = fs.readFileSync('test/data/pairwise.aln', 'utf8')
  const res = parsePairwise(ret)
  expect(res).toMatchSnapshot()
})
