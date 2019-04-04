import { ok as assert } from "assert";
import LocalFile from "./localFile";
import { getFirstNonEmptyLine, parseVersion } from "./util";

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

// this implementation is based on the BioPython AlignIO.Clustal code
export function parse(arr: Iterator<string>): Results {
  let line = getFirstNonEmptyLine(arr);
  if (!line) throw new Error("Empty file received");
  const info = line;

  const knownHeaders = ["CLUSTAL", "PROBCONS", "MUSCLE", "MSAPROBS", "Kalign"];

  if (!knownHeaders.find((l: string): boolean => line.startsWith(l))) {
    console.warn(
      `${info} is not a known CLUSTAL header: ${knownHeaders.join(
        ","
      )}, proceeding but could indicate an issue`
    );
  }
  const version = parseVersion(line);
  line = getFirstNonEmptyLine(arr);

  const ids: string[] = [];
  const seqs: string[] = [];
  let consensus = "";
  let seqStart = 0;
  let seqEnd = 0;

  // Use the first block to get the sequence identifiers
  while (line) {
    if (line[0] !== " " && line.trim() !== "") {
      // Sequences identifier...
      const fields = line.trim().split(/\s+/);

      // We expect there to be two fields, there can be an optional
      // "sequence number" field containing the letter count.
      if (fields.length < 2 || fields.length > 3)
        throw new Error(`Could not parse line:\n${line}`);

      if (ids.includes(fields[0]))
        throw new Error("duplicate ID detected: " + fields[0]);
      ids.push(fields[0]);
      seqs.push(fields[1]);

      // Record the sequence position to get the consensus
      if (!seqStart) {
        const temp = line.slice(fields[0].length);
        seqStart = fields[0].length + temp.indexOf(fields[1]);
        seqEnd = seqStart + fields[1].length;
      }
      if (fields.length === 3) {
        // This MAY be an old style file with a letter count...
        const letters = parseInt(fields[2], 10);
        if (Number.isNaN(letters))
          console.warn(`Could not parse line, bad sequence number:\n${line}`);
        if (fields[1].replace(/-/g, "").length !== letters)
          console.warn(
            `Could not parse line, invalid sequence number:\n${line}`
          );
      }
    } else if (line[0] === " ") {
      // Sequence consensus line...
      if (ids.length !== seqs.length || ids.length === 0)
        throw new Error(`Failed to parse, expecting consensus line:\n${line}`);
      if (!seqStart)
        throw new Error(
          `Failed to find what constitutes the seq columns to get the consensus line:\n${line}`
        );
      consensus = line.slice(seqStart, seqEnd);
      line = arr.next().value;
      if (line && line.trim() !== "")
        throw new Error(`Expected blank line: ${line}`);
      break;
    } else {
      // No consensus line
      consensus = " ".repeat(seqEnd - seqStart);
      break;
    }
    line = arr.next().value;
  }

  // Confirm all same length
  for (const s of seqs) assert(s.length === seqs[0].length);
  if (consensus) assert(consensus.length === seqs[0].length);
  line = getFirstNonEmptyLine(arr);

  while (line) {
    for (let i = 0; i < ids.length; i += 1) {
      assert(line[0] !== " ", `Unexpected line:\n${line}`);
      const fields = line.trim().split(/\s+/);

      // We expect there to be two fields, there can be an optional
      // "sequence number" field containing the letter count.
      if (fields.length < 2 || fields.length > 3)
        throw new Error(`Could not parse line:\n${line}`);

      if (fields[0] !== ids[i])
        throw new Error(
          `Identifiers out of order? Got '${fields[0]}' but expected '${
            ids[i]
          }'`
        );

      if (fields[1] !== line.slice(seqStart, seqEnd)) {
        const temp = line.slice(fields[0].length);
        const start = fields[0].length + temp.indexOf(fields[1]);
        assert(
          start === seqStart,
          `Old location ${seqStart}:${seqEnd} -> ${start}:XX`
        );
        const end = start + fields[1].length;
        seqStart = start;
        seqEnd = end;
      }

      // Append the sequence
      seqs[i] += fields[1];
      assert(seqs[i].length === seqs[0].length);

      if (fields.length === 3) {
        // This MAY be an old style file with a letter count...
        const letters = parseInt(fields[2], 10);
        if (Number.isNaN(letters)) {
          console.warn(`Could not parse line, bad sequence number:\n${line}`);
        }
        if (seqs[i].replace(/-/g, "").length !== letters) {
          console.warn(
            `Could not parse line, invalid sequence number:\n${line}`
          );
        }
      }
      line = arr.next().value;
    }
    // There should now be a consensus line
    if (consensus) {
      assert(line[0] === " ");
      consensus += line.slice(seqStart, seqEnd);
    }
    line = getFirstNonEmptyLine(arr);
  }
  consensus = consensus.trim();
  const alns = seqs.map((n, index): Alignment => ({ id: ids[index], seq: n }));

  return { consensus, alns, header: { info, version } };
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
