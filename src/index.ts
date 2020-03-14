import { parseBlocks, parseHeader, getFirstNonEmptyLine } from "./util";

export function parseIter(arr: Iterator<string>): Results {
  const line = getFirstNonEmptyLine(arr);
  if (!line) throw new Error("Empty file received");
  const header = parseHeader(line);

  const res = parseBlocks(arr);
  if (res === undefined) throw new Error("No blocks parsed");

  const alns = res.seqs.map(
    (n, index): Alignment => ({ id: res.ids[index], seq: n })
  );
  const { consensus } = res;
  if (consensus.length != alns[0].seq.length) {
    throw new Error(
      `Consensus length != sequence length. Con ${consensus.length} seq ${alns[0].seq.length}`
    );
  }

  return { consensus, alns, header };
}

export function parse(contents: string): Results {
  const iter = contents.split("\n")[Symbol.iterator]();
  return parseIter(iter);
}
