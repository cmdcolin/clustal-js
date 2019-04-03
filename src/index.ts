import assert from "assert";
import LocalFile from "./localFile";

export function parse(arr) {
  let line = arr.next().value;
  assert(line !== undefined, "Empty file");

  const knownHeaders = [
    "CLUSTAL O",
    "CLUSTAL W",
    "CLUSTALW",
    "CLUSTALO",
    "CLUSTAL",
    "PROBCONS",
    "MUSCLE"
  ];
  const header = knownHeaders.find(l => line.startsWith(l));
  const rest = line.slice(header.length);
  if (header === undefined) {
    throw new Error(
      `${header} is not a known CLUSTAL header: ${knownHeaders.join(",")}`
    );
  }

  let version;
  const words = rest.split(/\s+/);
  for (let word of words) {
    if (word[0] === "(" && word[word.length - 1] === ")") {
      word = word.substring(1, word.length - 1);
    }
    if ("0123456789".includes(word[0])) {
      version = word;
      break;
    }
  }
  // There should be two blank lines after the header line
  line = arr.next().value;
  while (line.trim() === "") {
    line = arr.next().value;
  }

  const ids = [];
  const seqs = [];
  let consensus = "";
  let seqCols = null;

  // Use the first block to get the sequence identifiers
  while (line) {
    if (line[0] !== " " && line.trim() !== "") {
      // Sequences identifier...
      const fields = line.trimEnd().split(/\s+/);

      // We expect there to be two fields, there can be an optional
      // "sequence number" field containing the letter count.
      if (fields.length < 2 || fields.length > 3)
        throw new Error(`Could not parse line:\n${line}`);

      ids.push(fields[0]);
      seqs.push(fields[1]);

      // Record the sequence position to get the consensus
      if (seqCols === null) {
        const temp = line.slice(fields[0].length);
        const start = fields[0].length + temp.indexOf(fields[1]);
        const end = start + fields[1].length;
        seqCols = [start, end];
      }
      if (fields.length === 3) {
        // This MAY be an old style file with a letter count...
        const letters = parseInt(fields[2], 10);
        if (Number.isNaN(letters))
          throw new Error(
            `Could not parse line, bad sequence number:\n${line}`
          );
        if (fields[1].replace("-", "").length !== letters)
          throw new Error(
            `Could not parse line, invalid sequence number:\n${line}`
          );
      }
    } else if (line[0] === " ") {
      // Sequence consensus line...
      if (ids.length !== seqs.length || ids.length === 0)
        throw new Error(`Failed to parse, expecting consensus line:\n${line}`);
      if (seqCols === null)
        throw new Error(
          `Failed to find what cosntitutes the seq columns to get the consensus line:\n${line}`
        );
      consensus = line.slice(seqCols[0], seqCols[1]);
      line = arr.next().value;
      if (line && line.trim() !== "")
        throw new Error(`Expected blank line: ${line}`);
      break;
    } else {
      // No consensus line
      consensus = " ".repeat(seqCols[1] - seqCols[0]);
      break;
    }
    line = arr.next().value;
  }

  // Confirm all same length
  for (const s of seqs) assert(s.length === seqs[0].length);
  if (consensus) assert(consensus.length === seqs[0].length);

  const done = false;
  while (!done) {
    // There should be a blank line between each block.
    // Also want to ignore any consensus line from the
    // previous block.
    while (line && line.trim() === "") {
      line = arr.next().value;
    }
    if (!line) break; // end of file

    // if (knownHeaders.includes(line.split(/\s+/, 1)[0])) {
    //   // Found concatenated alignment.
    //   done = true
    //   break
    // }
    for (let i = 0; i < ids.length; i += 1) {
      assert(line[0] !== " ", `Unexpected line:\n${line}`);
      const fields = line.trimEnd().split(/\s+/);

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

      if (fields[1] !== line.slice(seqCols[0], seqCols[1])) {
        const temp = line.slice(fields[0].length);
        const start = fields[0].length + temp.indexOf(fields[1]);
        assert(start === seqCols[0], `Old location ${seqCols} -> ${start}:XX`);
        const end = start + fields[1].length;
        seqCols = [start, end];
      }

      // Append the sequence
      seqs[i] += fields[1];
      assert(seqs[i].length === seqs[0].length);

      if (fields.length === 3) {
        // This MAY be an old style file with a letter count...
        const letters = parseInt(fields[2], 10);
        if (Number.isNaN(letters)) {
          throw new Error(
            `Could not parse line, bad sequence number:\n${line}`
          );
        }
        if (seqs[i].replace("-", "").length !== letters) {
          throw new Error(
            `Could not parse line, invalid sequence number:\n${line}`
          );
        }
      }
      line = arr.next().value;
    }
    // There should now be a consensus line
    if (consensus) {
      assert(line[0] === " ");
      assert(seqCols !== null);
      consensus += line[seqCols];
      // assert len(consensus) == len(seqs[0])
      // assert not line[:seqCols.start].strip()
      // assert not line[seqCols.stop:].strip()
      // Read in the next line
      line = arr.next().value;
    }
  }
  return { consensus, seqs, ids, header, version };

  // assert len(ids) == len(seqs)
  // if len(seqs) == 0 or len(seqs[0]) == 0:
  //     raise StopIteration

  // if self.records_per_alignment is not None \
  // and self.records_per_alignment != len(ids):
  //     raise ValueError("Found %i records in this alignment, told to expect %i" \
  //                      % (len(ids), self.records_per_alignment))

  // records = (SeqRecord(Seq(s, self.alphabet), id=i, description=i) \
  //            for (i,s) in zip(ids, seqs))
  // alignment = MultipleSeqAlignment(records, self.alphabet)
  // #TODO - Handle alignment annotation better, for now
  // #mimic the old parser in Bio.Clustalw
  // if version:
  //     alignment._version = version
  // if consensus:
  //     alignment_length = len(seqs[0])
  //     assert len(consensus) == alignment_length, \
  //            "Alignment length is %i, consensus length is %i, '%s'" \
}
export function parseString(contents) {
  const iter = contents.split("\n")[Symbol.iterator]();
  return parse(iter);
}
export async function parseFile(filename) {
  const f = new LocalFile(filename);
  const contents = await f.readFile();
  return parseString(contents.toString());
}
