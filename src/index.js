import LocalFile from './localFile'

export default class ClustalParser {
  constructor({ filename }) {
    if (filename) {
      this.clustal = new LocalFile(filename)
    }
  }

  async parse() {
    const contents = (await this.clustal.readFile()).toString().split('\n')
    const arr = contents[Symbol.iterator]()
    let line = arr.next()
    if (line.done) throw new Error('empty file')
    else line = line.value

    const knownHeaders = [
      'CLUSTAL O',
      'CLUSTAL W',
      'CLUSTALW',
      'CLUSTALO',
      'CLUSTAL',
      'PROBCONS',
      'MUSCLE',
    ]
    const header = knownHeaders.find(l => line.startsWith(l))
    const rest = line.slice(header.length)
    if (header === undefined) {
      throw new Error(
        `${header} is not a known CLUSTAL header: ${knownHeaders.join(',')}`,
      )
    }

    let version
    const words = rest.split(' ')
    for (let word of words) {
      if (word[0] === '(' && word[word.length-1] === ')') {
        word = word.substring(1, word.length - 1)
        console.log(word)
      }
      if ('0123456789'.includes(word[0])) {
        version = word
        break
      }
    }
    console.log(header, version)
    //There should be two blank lines after the header line
    line = arr.next().value
    while(line.trim() === "") {
        line = arr.next().value
    }

    const ids = []
    const seqs = []
    const consensus = ""
    let seq_cols = null

    //Use the first block to get the sequence identifiers
    while(true) {
        if(line[0] !== " " && line.trim() !== "") {
            //Sequences identifier...
            const fields = line.trimEnd().split(' ')
            console.log(fields)

            //We expect there to be two fields, there can be an optional
            //"sequence number" field containing the letter count.
            if(fields.length !== 2)
                throw new Error("Could not parse line:\n"+line)

            ids.append(fields[0])
            seqs.append(fields[1])

            //Record the sequence position to get the consensus
            if(seq_cols === null) {
                start = fields[0].length + line.slice(fields[0].length).find(fields[1])
                end = start + fields[1].length
                seq_cols = [start, end]
            }
            console.log(fields[1], line.slice(start, end))
        }//remove
    }//remove

//             if len(fields) == 3:
//                 #This MAY be an old style file with a letter count...
//                 try:
//                     letters = int(fields[2])
//                 except ValueError:
//                     raise ValueError("Could not parse line, bad sequence number:\n%s" % line)
//                 if len(fields[1].replace("-","")) != letters:
//                     raise ValueError("Could not parse line, invalid sequence number:\n%s" % line)
//         elif line[0] == " ":
//             #Sequence consensus line...
//             assert len(ids) == len(seqs)
//             assert len(ids) > 0
//             assert seq_cols is not None
//             consensus = line[seq_cols]
//             assert not line[:seq_cols.start].strip()
//             assert not line[seq_cols.stop:].strip()
//             #Check for blank line (or end of file)
//             line = handle.readline()
//             assert line.strip() == ""
//             break
//         else:
//             #No consensus
//             break
//         line = handle.readline()
//         if not line : break #end of file

    // assert line.strip() == ""
    // assert seq_cols is not None

    // #Confirm all same length
    // for s in seqs:
    //     assert len(s) == len(seqs[0])
    // if consensus:
    //     assert len(consensus) == len(seqs[0])

    // #Loop over any remaining blocks...
    // done = False
    // while not done:
    //     #There should be a blank line between each block.
    //     #Also want to ignore any consensus line from the
    //     #previous block.
    //     while (not line) or line.strip() == "":
    //         line = handle.readline()
    //         if not line : break # end of file
    //     if not line : break # end of file

    //     if line.split(None,1)[0] in known_headers:
    //         #Found concatenated alignment.
    //         done = True
    //         self._header = line
    //         break

    //     for i in range(len(ids)):
    //         assert line[0] != " ", "Unexpected line:\n%s" % repr(line)
    //         fields = line.rstrip().split()

    //         #We expect there to be two fields, there can be an optional
    //         #"sequence number" field containing the letter count.
    //         if len(fields) < 2 or len(fields) > 3:
    //             raise ValueError("Could not parse line:\n%s" % repr(line))

    //         if fields[0] != ids[i]:
    //             raise ValueError("Identifiers out of order? Got '%s' but expected '%s'" \
    //                               % (fields[0], ids[i]))

    //         if fields[1] != line[seq_cols]:
    //             start = len(fields[0]) + line[len(fields[0]):].find(fields[1])
    //             assert start == seq_cols.start, 'Old location %s -> %i:XX' % (seq_cols, start)
    //             end = start + len(fields[1])
    //             seq_cols = slice(start, end)
    //             del start, end

    //         #Append the sequence
    //         seqs[i] += fields[1]
    //         assert len(seqs[i]) == len(seqs[0])

    //         if len(fields) == 3:
    //             #This MAY be an old style file with a letter count...
    //             try:
    //                 letters = int(fields[2])
    //             except ValueError:
    //                 raise ValueError("Could not parse line, bad sequence number:\n%s" % line)
    //             if len(seqs[i].replace("-","")) != letters:
    //                 raise ValueError("Could not parse line, invalid sequence number:\n%s" % line)

    //         #Read in the next line
    //         line = handle.readline()
    //     #There should now be a consensus line
    //     if consensus:
    //         assert line[0] == " "
    //         assert seq_cols is not None
    //         consensus += line[seq_cols]
    //         assert len(consensus) == len(seqs[0])
    //         assert not line[:seq_cols.start].strip()
    //         assert not line[seq_cols.stop:].strip()
    //         #Read in the next line
    //         line = handle.readline()

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
}
