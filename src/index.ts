import { ok as assert } from "assert";
import LocalFile from "./localFile";
import {
  parseBlock,
  parseBlocks,
  parseHeader,
  getFirstNonEmptyLine,
  getSeqBounds,
  parseVersion
} from "./util";

interface Header {
  version: string;
  info: string;
}
interface Alignment {
  id: string;
  seq: string;
}
interface Results {
  header: Header;
  alns: Alignment[];
  consensus?: string;
}

export function parse(arr: Iterator<string>): Results {
  let line = getFirstNonEmptyLine(arr);
  if (!line) throw new Error("Empty file received");
  const header = parseHeader(line);

  const res = parseBlocks(arr);

  const alns = res.seqs.map(
    (n, index): Alignment => ({ id: res.ids[index], seq: n })
  );
  const { consensus } = res;
  if(consensus.length != alns[0].seq.length) {
    throw new Error(`Consensus length != sequence length. Con ${consensus.length} seq ${alns[0].length}`)
  }

  return { consensus, alns, header };
}

export function parseString(contents: string): Results {
  const iter = contents.split("\n")[Symbol.iterator]();
  return parse(iter);
}

export async function parseFile(filename: string): Promise<Results> {
  const f = new LocalFile(filename);
  const contents = await f.readFile();
  return parseString(contents.toString());
}
