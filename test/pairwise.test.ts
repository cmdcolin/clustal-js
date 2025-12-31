import { test, expect } from 'vitest'
import { parsePairwise } from '../src/index.ts'
import * as fs from 'fs'

test('pairwise with position numbers', async () => {
  const ret = fs.readFileSync('test/data/pairwise.aln', 'utf8')
  const res = parsePairwise(ret)
  expect(res).toMatchSnapshot()
})

test('pairwise without position numbers (EMBOSS simple format)', () => {
  const input = `# EMBOSS alignment
     a MAEVLRTLAG
       ::::::::::
     b MAEVLRTLAG

     a KYLGRVQEAE
       ||||||||||
     b KYLGRVQEAE
`
  const res = parsePairwise(input)
  expect(res).toEqual({
    consensus: '::::::::::||||||||||',
    alns: [
      { id: 'a', seq: 'MAEVLRTLAGKYLGRVQEAE' },
      { id: 'b', seq: 'MAEVLRTLAGKYLGRVQEAE' },
    ],
  })
})

test('EMBOSS matcher format with position ruler lines', () => {
  const input = `########################################
# Program: matcher
# Rundate: Wed 31 Dec 2025 00:16:21
# Commandline: matcher
#    -auto
#    -stdout
# Align_format: markx0
# Report_file: stdout
########################################

#=======================================
#
# Aligned_sequences: 2
# 1: a
# 2: b
# Matrix: EBLOSUM62
# Gap_penalty: 14
# Extend_penalty: 4
#
# Length: 100
# Identity:      99/100 (99.0%)
# Similarity:    99/100 (99.0%)
# Gaps:           1/100 ( 1.0%)
# Score: 500
#
#
#=======================================

               10        20        30        40        50
     a MAEVLRTLAGKPKCHALRPMILFLIMLVLVLFGYGVLSPRSLMPGSLERG
       ::::::::::::::::::::::::::::::::::::::::::::::::::
     b MAEVLRTLAGKPKCHALRPMILFLIMLVLVLFGYGVLSPRSLMPGSLERG
               10        20        30        40        50

               60        70        80         90       100
     a FCMAVREPDHLQRVSLPRMVYPQPKVLTPCRKDVLV-TPWLAPIVWEGTF
       :::::::::::::::::::::::::::::::::::: :::::::::::::
     b FCMAVREPDHLQRVSLPRMVYPQPKVLTPCRKDVLVVTPWLAPIVWEGTF
               60        70        80        90       100

#---------------------------------------
#---------------------------------------
`
  const res = parsePairwise(input)
  expect(res).toEqual({
    consensus:
      ':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: :::::::::::::',
    alns: [
      {
        id: 'a',
        seq: 'MAEVLRTLAGKPKCHALRPMILFLIMLVLVLFGYGVLSPRSLMPGSLERGFCMAVREPDHLQRVSLPRMVYPQPKVLTPCRKDVLV-TPWLAPIVWEGTF',
      },
      {
        id: 'b',
        seq: 'MAEVLRTLAGKPKCHALRPMILFLIMLVLVLFGYGVLSPRSLMPGSLERGFCMAVREPDHLQRVSLPRMVYPQPKVLTPCRKDVLVVTPWLAPIVWEGTF',
      },
    ],
  })
})
