import { parsePairwiseBlocks } from './pairwise.ts'
import { parseBlocks, parseHeader, getFirstNonEmptyLine } from './util.ts'

export function parseClustalIter(arr: Iterator<string>) {
  const line = getFirstNonEmptyLine(arr)
  if (!line) {
    throw new Error('Empty file received')
  }
  const header = parseHeader(line)

  const res = parseBlocks(arr)
  if (res === undefined) {
    throw new Error('No blocks parsed')
  }

  const alns = res.seqs.map((n, index) => ({ id: res.ids[index], seq: n }))
  const { consensus } = res
  if (consensus.length != alns[0]!.seq.length) {
    throw new Error(
      `Consensus length != sequence length. Con ${consensus.length} seq ${alns[0]!.seq.length}`,
    )
  }

  return { consensus, alns, header }
}

export interface Row {
  id: string
  seq: string
}

export function parse(contents: string) {
  const iter = contents.split('\n')[Symbol.iterator]()
  return parseClustalIter(iter)
}

export function parsePairwise(contents: string) {
  const filtered = contents
    .split('\n')
    .filter(f => !f.startsWith('#'))
    .join('\n')

  const res = parsePairwiseBlocks(filtered.split('\n')[Symbol.iterator]())
  if (res === undefined) {
    throw new Error('No blocks parsed')
  }

  const alns = res.seqs.map((n, index) => ({ id: res.ids[index], seq: n }))
  const { consensus } = res
  const firstAln = alns[0]
  if (!firstAln) {
    throw new Error('No alignments found')
  }
  if (consensus.length !== firstAln.seq.length) {
    throw new Error(
      `Consensus length !== sequence length. Con ${consensus.length} seq ${firstAln.seq.length}`,
    )
  }
  if (alns.length !== 2) {
    throw new Error(
      `Expected exactly 2 sequences in pairwise alignment, got ${alns.length}`,
    )
  }
  return {
    consensus,
    alns: alns as [Row, Row],
  }
}
