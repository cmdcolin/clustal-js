[![Build Status](https://travis-ci.com/cmdcolin/clustal-js.svg?branch=master)](https://travis-ci.com/cmdcolin/clustal-js)

# clustal-js

This parses clustal output format


Example input

```
sp|P69905|HBA_HUMAN       MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHG  60
sp|P01942|HBA_MOUSE       MVLSGEDKSNIKAAWGKIGGHGAEYGAEALERMFASFPTTKTYFPHFDVSHGSAQVKGHG  60
sp|P13786|HBAZ_CAPHI      MSLTRTERTIILSLWSKISTQADVIGTETLERLFSCYPQAKTYFPHFDLHSGSAQLRAHG  60
                          * *:  ::: : : *.*:. :.   *:*:***:* .:* :********:  ****::.**

sp|P69905|HBA_HUMAN       KKVADALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTP  120
sp|P01942|HBA_MOUSE       KKVADALASAAGHLDDLPGALSALSDLHAHKLRVDPVNFKLLSHCLLVTLASHHPADFTP  120
sp|P13786|HBAZ_CAPHI      SKVVAAVGDAVKSIDNVTSALSKLSELHAYVLRVDPVNFKFLSHCLLVTLASHFPADFTA  120
                          .**. *: .*.  :*:: .*** **:***: *********:**********:* **:**

sp|P69905|HBA_HUMAN       AVHASLDKFLASVSTVLTSKYR        142
sp|P01942|HBA_MOUSE       AVHASLDKFLASVSTVLTSKYR        142
sp|P13786|HBAZ_CAPHI      DAHAAWDKFLSIVSGVLTEKYR        142
                           .**: ****: ** ***.***
```

Example output

```
      { consensus:
         '* *:  ::: : : *.*:. :.   *:*:***:* .:* :********:  ****::.**.**. *: .*.  :*:: .*** **:***: *********:**********:* **:** .**: ****: ** ***.***',
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

