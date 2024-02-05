import { parsePairwise } from '../src'
import * as fs from 'fs'

test('pairwise', async () => {
  const ret = fs.readFileSync(require.resolve('./data/pairwise.aln'), 'utf8')
  const res = parsePairwise(ret)
  expect(res).toMatchSnapshot()
})
