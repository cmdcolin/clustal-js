import { getFirstNonEmptyLine } from './util'

export function getSeqBounds(line: string) {
  const fields = line.split(/\s+/)
  const k1 = fields[0].length + fields[1].length
  const temp = line.slice(k1)
  const s = k1 + temp.indexOf(fields[2])
  const e = s + fields[2].length
  return [s, e] as const
}

// Use the first block to get the sequence identifiers
export function parsePairwiseBlock(arr: Iterator<string>) {
  let line = getFirstNonEmptyLine(arr)
  const block = []
  let consensusLine = ''
  if (!line) {
    return undefined
  }

  while (line) {
    if (line.startsWith(' ')) {
      consensusLine = line
    } else {
      block.push(line)
    }
    line = arr.next().value
  }
  const [start, end] = getSeqBounds(block[0])
  const fields = block.map(s => s.split(/\s+/))
  const ids = fields.map(s => s[0])
  const seqs = fields.map(s => s[2])
  let consensus = consensusLine.slice(start, end)

  // handle if the consensus trailing whitespace got trimmed
  const remainder = seqs[0].length - consensus.length
  if (remainder) {
    consensus += ' '.repeat(remainder)
  }
  return { ids, seqs, consensus }
}

export function parsePairwiseBlocks(arr: Iterator<string>) {
  let block
  const res = parsePairwiseBlock(arr)
  if (res !== undefined) {
    while ((block = parsePairwiseBlock(arr))) {
      for (let i = 0; i < block.seqs.length; i++) {
        res.seqs[i] += block.seqs[i]
      }
      res.consensus += block.consensus
    }
  }
  return res
}
