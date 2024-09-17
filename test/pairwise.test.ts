import { test, expect } from 'vitest'
import { parsePairwise } from '../src/index.ts'
import * as fs from 'fs'

test('pairwise with position numbers', async () => {
  const ret = fs.readFileSync('test/data/pairwise.aln', 'utf8')
  const res = parsePairwise(ret)
  expect(res).toMatchSnapshot()
})

test('pairwise without position numbers (EMBOSS simple format)', () => {
  const input = `# EMBOSS alignment
     a MAEVLRTLAG
       ::::::::::
     b MAEVLRTLAG

     a KYLGRVQEAE
       ||||||||||
     b KYLGRVQEAE
`
  const res = parsePairwise(input)
  expect(res).toEqual({
    consensus: '::::::::::||||||||||',
    alns: [
      { id: 'a', seq: 'MAEVLRTLAGKYLGRVQEAE' },
      { id: 'b', seq: 'MAEVLRTLAGKYLGRVQEAE' },
    ],
  })
})
