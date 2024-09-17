import { getFirstNonEmptyLine } from './util.ts'

function isSequenceLine(line: string) {
  const trimmed = line.trim()
  return /^\w+\s+/.test(trimmed)
}

function hasPositionNumbers(fields: string[]) {
  return fields.length >= 3 && /^\d+$/.test(fields[1])
}

export function getSeqBounds(line: string, seqIndex: number) {
  const trimmed = line.trim()
  const fields = trimmed.split(/\s+/)
  const seq = fields[seqIndex]
  const seqStart = line.indexOf(seq, line.indexOf(fields[0]) + fields[0].length)
  return [seqStart, seqStart + seq.length] as const
}

// Use the first block to get the sequence identifiers
export function parsePairwiseBlock(arr: Iterator<string>) {
  let line = getFirstNonEmptyLine(arr)
  const block: string[] = []
  let consensusLine = ''
  if (!line) {
    return undefined
  }

  while (line) {
    if (isSequenceLine(line)) {
      block.push(line)
    } else {
      consensusLine = line
    }
    line = arr.next().value
  }

  if (block.length === 0) {
    return undefined
  }

  const fields = block.map(s => s.trim().split(/\s+/))
  const seqIndex = hasPositionNumbers(fields[0]) ? 2 : 1
  const [start, end] = getSeqBounds(block[0], seqIndex)
  const ids = fields.map(s => s[0])
  const seqs = fields.map(s => s[seqIndex])
  let consensus = consensusLine.slice(start, end)

  // handle if the consensus trailing whitespace got trimmed
  const remainder = seqs[0].length - consensus.length
  if (remainder > 0) {
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
