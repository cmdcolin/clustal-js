[![Build Status](https://travis-ci.com/cmdcolin/clustal-js.svg?branch=master)](https://travis-ci.com/cmdcolin/clustal-js)

# clustal-js

This parses clustal output format

## Usage

```typescript
import { parse } from 'clustal-js'
const file = fs.readFileSync('test.aln', 'utf8')
const ret = parse(file)
```

## Example

Input

```
CLUSTAL O(1.2.4) multiple sequence alignment


sp|P69905|HBA_HUMAN       MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHG	60
sp|P01942|HBA_MOUSE       MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERMFASFPTTKTYFPHFDVSHGSAQVKGHG	60
sp|P13786|HBAZ_CAPHI      MSLTRTERTIILSLWSKISTQADVIGTETLERLFSCYPQAKTYFPHFDLHSGSAQLRAHG	60
                          * *:  ::: : : *.*:. :.   *:*:***:* .:* :********:  ****::.**

sp|P69905|HBA_HUMAN       KKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTP	120
sp|P01942|HBA_MOUSE       KKVADALASAAGHLDDLPGALSALSDLHAHKLRVDPVNFKLLSHCLLVTLASHHPADFTP	120
sp|P13786|HBAZ_CAPHI      SKVVAAVGDAVKSIDNVTSALSKLSELHAYVLRVDPVNFKFLSHCLLVTLASHFPADFTA	120
                          .**. *: .*.  :*:: .*** **:***: *********:**********:* **:**

sp|P69905|HBA_HUMAN       AVHASLDKFLASVSTVLTSKYR	142
sp|P01942|HBA_MOUSE       AVHASLDKFLASVSTVLTSKYR	142
sp|P13786|HBAZ_CAPHI      DAHAAWDKFLSIVSGVLTEKYR	142
                           .**: ****: ** ***.***
```

Output

```
      { consensus:
         '* *:  ::: : : *.*:. :.   *:*:***:* .:* :********:  ****::.**.**. *: .*.  :*:: .*** **:***: *********:**********:* **:**  .**: ****: ** ***.***',
        alns:
         [ { id: 'sp|P69905|HBA_HUMAN',
             seq:
              'MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFLASVSTVLTSKYR' },
           { id: 'sp|P01942|HBA_MOUSE',
             seq:
              'MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERMFASFPTTKTYFPHFDVSHGSAQVKGHGKKVADALASAAGHLDDLPGALSALSDLHAHKLRVDPVNFKLLSHCLLVTLASHHPADFTPAVHASLDKFLASVSTVLTSKYR' },
           { id: 'sp|P13786|HBAZ_CAPHI',
             seq:
              'MSLTRTERTIILSLWSKISTQADVIGTETLERLFSCYPQAKTYFPHFDLHSGSAQLRAHGSKVVAAVGDAVKSIDNVTSALSKLSELHAYVLRVDPVNFKFLSHCLLVTLASHFPADFTADAHAAWDKFLSIVSGVLTEKYR' } ],
        header:
         { info: 'CLUSTAL O(1.2.4) multiple sequence alignment',
           version: '1.2.4' } }
```

### Parse pairwise outputs

```typescript
import { parsePairwise } from 'clustal-js'
const file = fs.readFileSync('test.aln', 'utf8')
const ret = parse(file)
```

Input

```

########################################
# Program: needle
# Rundate: Mon  5 Feb 2024 17:52:19
# Commandline: needle
#    -auto
#    -stdout
#    -asequence emboss_needle-R20240205-175207-0261-70863964-p1m.asequence
#    -bsequence emboss_needle-R20240205-175207-0261-70863964-p1m.bsequence
# Align_format: srspair
# Report_file: stdout
########################################

#=======================================
#
# Aligned_sequences: 2
# 1: a
# 2: b
# Matrix: EBLOSUM62
# Gap_penalty: 10.0
# Extend_penalty: 0.5
#
# Length: 614
# Identity:     221/614 (36.0%)
# Similarity:   221/614 (36.0%)
# Gaps:         393/614 (64.0%)
# Score: 1114.0
#
#
#=======================================

a                  1 MGQKGHKDSLYPCGGTPESSLHEALDQCMTALDLFLTNQFSEALSYLKPR     50

b                  0 --------------------------------------------------      0

a                 51 TKESMYHSLTYATILEMQAMMTFDPQDILLAGNMMKEAQMLCQRHRRKSS    100

b                  0 --------------------------------------------------      0

a                101 VTDSFSSLVNRPTLGQFTEEEIHAEVCYAECLLQRAALTFLQGSSHGGAV    150

b                  0 --------------------------------------------------      0

a                151 RPRALHDPSHACSCPPGPGRQHLFLLQDENMVSFIKGGIKVRNSYQTYKE    200

b                  0 --------------------------------------------------      0

a                201 LDSLVQSSQYCKGENHPHFEGGVKLGVGAFNLTLSMLPTRILRLLEFVGF    250

b                  0 --------------------------------------------------      0

a                251 SGNKDYGLLQLEEGASGHSFRSVLCVMLLLCYHTFLTFVLGTGNVNIEEA    300

b                  0 --------------------------------------------------      0

a                301 EKLLKPYLNRYPKGAIFLFFAGRIEVIKGNIDAAIRRFEECCEAQQHWKQ    350

b                  0 --------------------------------------------------      0

a                351 FHHMCYWELMWCFTYKGQWKMSYFYADLLSKENCWSKATYIYMKAAYLSM    400
                                                               ||||||||
b                  1 ------------------------------------------MKAAYLSM      8

a                401 FGKEDHKPFGDDEVELFRAVPGLKLKIAGKSLPTEKFAIRKSRRYFSSNP    450
                     ||||||||||||||||||||||||||||||||||||||||||||||||||
b                  9 FGKEDHKPFGDDEVELFRAVPGLKLKIAGKSLPTEKFAIRKSRRYFSSNP     58

a                451 ISLPVPALEMMYIWNGYAVIGKQPKLTDGILEIITKAEEMLEKGPENEYS    500
                     ||||||||||||||||||||||||||||||||||||||||||||||||||
b                 59 ISLPVPALEMMYIWNGYAVIGKQPKLTDGILEIITKAEEMLEKGPENEYS    108

a                501 VDDECLVKLLKGLCLKYLGRVQEAEENFRSISANEKKIKYDHYLIPNALL    550
                     ||||||||||||||||||||||||||||||||||||||||||||||||||
b                109 VDDECLVKLLKGLCLKYLGRVQEAEENFRSISANEKKIKYDHYLIPNALL    158

a                551 ELALLLMEQDRNEEAIKLLESAKQNYKNYSMESRTHFRIQAATLQAKSSL    600
                     ||||||||||||||||||||||||||||||||||||||||||||||||||
b                159 ELALLLMEQDRNEEAIKLLESAKQNYKNYSMESRTHFRIQAATLQAKSSL    208

a                601 ENSSRSMVSSVSL-    613
                     |||||||||||||
b                209 ENSSRSMVSSVSL*    222


#---------------------------------------
#---------------------------------------
```

### Notes

See tests for example files
