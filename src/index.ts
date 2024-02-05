import {
  parseBlocks,
  parseHeader,
  getFirstNonEmptyLine,
  parsePairwiseBlocks,
} from './util'

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
  if (consensus.length != alns[0].seq.length) {
    throw new Error(
      `Consensus length != sequence length. Con ${consensus.length} seq ${alns[0].seq.length}`,
    )
  }

  return { consensus, alns, header }
}

export function parsePairwiseIter(arr: string) {
  const res = parsePairwiseBlocks(arr.split('\n')[Symbol.iterator]())
  if (res === undefined) {
    throw new Error('No blocks parsed')
  }

  const alns = res.seqs.map((n, index) => ({ id: res.ids[index], seq: n }))
  const { consensus } = res
  if (consensus.length != alns[0].seq.length) {
    throw new Error(
      `Consensus length != sequence length. Con ${consensus.length} seq ${alns[0].seq.length}`,
    )
  }

  return { consensus, alns }
}

export function parse(contents: string) {
  const iter = contents.split('\n')[Symbol.iterator]()
  return parseClustalIter(iter)
}

export function parsePairwise(contents: string) {
  const res = contents
    .split('\n')
    .filter(f => !f.startsWith('#'))
    .join('\n')
  return parsePairwiseIter(res)
}
