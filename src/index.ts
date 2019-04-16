import { ok as assert } from "assert";
import { LocalFile } from "generic-filehandle";
import { parseBlocks, parseHeader, getFirstNonEmptyLine } from "./util";

export function parse(arr: Iterator<string>): Results {
  let line = getFirstNonEmptyLine(arr);
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
      `Consensus length != sequence length. Con ${consensus.length} seq ${
        alns[0].seq.length
      }`
    );
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
