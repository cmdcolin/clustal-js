export function parseVersion(line: string) {
  const res = line.match(/\(?(\d+(\.\d+)+)\)?/);
  return res && res.length > 1 ? res[1] : "";
}
export function parseHeader(info: string) {
  const knownHeaders = ["CLUSTAL", "PROBCONS", "MUSCLE", "MSAPROBS", "Kalign"];

  if (!knownHeaders.find((l) => info.startsWith(l))) {
    console.warn(
      `${info} is not a known CLUSTAL header: ${knownHeaders.join(
        ",",
      )}, proceeding but could indicate an issue`,
    );
  }
  const version = parseVersion(info);
  return { info, version };
}
export function parsePairwiseHeader(info: string) {}

export function getFirstNonEmptyLine(arr: Iterator<string>) {
  // There should be two blank lines after the header line
  let line = arr.next();
  while (!line.done && line.value.trim() === "") {
    line = arr.next();
  }
  return line.value;
}

export function getSeqBounds(line: string) {
  const fields = line.split(/\s+/);
  const temp = line.slice(fields[0].length);
  const s = fields[0].length + temp.indexOf(fields[1]);
  const e = s + fields[1].length;
  return [s, e] as const;
}

// Use the first block to get the sequence identifiers
export function parseBlock(arr: Iterator<string>) {
  let line = getFirstNonEmptyLine(arr);
  const block = [];
  let consensusLine = "";
  if (!line) {
    return undefined;
  }

  while (line) {
    if (line[0] !== " ") {
      block.push(line);
    } else {
      consensusLine = line;
    }
    line = arr.next().value;
  }
  console.log({ block, consensusLine });
  const [start, end] = getSeqBounds(block[0]);
  const fields = block.map((s) => s.split(/\s+/));
  console.log({ fields });
  const ids = fields.map((s) => s[0]);
  const seqs = fields.map((s) => s[2].trim());
  console.log({ seqs });
  let consensus = consensusLine.slice(start, end);

  // handle if the consensus trailing whitespace got trimmed
  const remainder = seqs[0].length - consensus.length;
  if (remainder) {
    consensus += " ".repeat(remainder);
  }
  console.log({ seqs, ids, consensus });
  return { ids, seqs, consensus };
}

export function parseBlocks(arr: Iterator<string>) {
  let block;
  const res = parseBlock(arr);
  if (res !== undefined) {
    while ((block = parseBlock(arr))) {
      for (let i = 0; i < block.seqs.length; i++) {
        res.seqs[i] += block.seqs[i];
      }
      res.consensus += block.consensus;
    }
  }
  return res;
}
