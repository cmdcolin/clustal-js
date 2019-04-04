import { parseString } from "../src";
// This is a truncated version of the example in Tests/cw02.aln
// Notice the inclusion of sequence numbers (right hand side)
const example1 = `CLUSTAL W (1.81) multiple sequence alignment


gi|4959044|gb|AAD34209.1|AF069      MENSDSNDKGSDQSAAQRRSQMDRLDREEAFYQFVNNLSEEDYRLMRDNN 50
gi|671626|emb|CAA85685.1|           ---------MSPQTETKASVGFKAGVKEYKLTYYTPEYETKDTDILAAFR 41
                                              * *: ::    :.   :*  :  :. : . :*  ::   .

gi|4959044|gb|AAD34209.1|AF069      LLGTPGESTEEELLRRLQQIKEGPPPQSPDENRAGESSDDVTNSDSIIDW 100
gi|671626|emb|CAA85685.1|           VTPQPG-----------------VPPEEAGAAVAAESSTGT--------- 65
                                    :   **                  **:...   *.*** ..

gi|4959044|gb|AAD34209.1|AF069      LNSVRQTGNTTRSRQRGNQSWRAVSRTNPNSGDFRFSLEINVNRNNGSQT 150
gi|671626|emb|CAA85685.1|           WTTVWTDGLTSLDRYKG-----RCYHIEPVPG------------------ 92
                                     .:*   * *: .* :*        : :* .*

gi|4959044|gb|AAD34209.1|AF069      SENESEPSTRRLSVENMESSSQRQMENSASESASARPSRAERNSTEAVTE 200
gi|671626|emb|CAA85685.1|           -EKDQCICYVAYPLDLFEEGSVTNMFTSIVGNVFGFKALRALRLEDLRIP 141
                                     *::.  .    .:: :*..*  :* .*   .. .  :    .  :

gi|4959044|gb|AAD34209.1|AF069      VPTTRAQRRA 210
gi|671626|emb|CAA85685.1|           VAYVKTFQGP 151
                                    *. .:: : .
`;
// This example is a truncated version of the dataset used here:
// http://virgil.ruc.dk/kurser/Sekvens/Treedraw.htm
// with the last record repeated twice (deliberate toture test)
const example2 = `CLUSTAL X (1.83) multiple sequence alignment


V_Harveyi_PATH                 --MKNWIKVAVAAIA--LSAA------------------TVQAATEVKVG
B_subtilis_YXEM                MKMKKWTVLVVAALLAVLSACG------------NGNSSSKEDDNVLHVG
B_subtilis_GlnH_homo_YCKK      MKKALLALFMVVSIAALAACGAGNDNQSKDNAKDGDLWASIKKKGVLTVG
YA80_HAEIN                     MKKLLFTTALLTGAIAFSTF-----------SHAGEIADRVEKTKTLLVG
FLIY_ECOLI                     MKLAHLGRQALMGVMAVALVAG---MSVKSFADEG-LLNKVKERGTLLVG
E_coli_GlnH                    --MKSVLKVSLAALTLAFAVS------------------SHAADKKLVVA
Deinococcus_radiodurans        -MKKSLLSLKLSGLLVPSVLALS--------LSACSSPSSTLNQGTLKIA
HISJ_E_COLI                    MKKLVLSLSLVLAFSSATAAF-------------------AAIPQNIRIG
HISJ_E_COLI                    MKKLVLSLSLVLAFSSATAAF-------------------AAIPQNIRIG
                                         : .                                 : :.

V_Harveyi_PATH                 MSGRYFPFTFVKQ--DKLQGFEVDMWDEIGKRNDYKIEYVTANFSGLFGL
B_subtilis_YXEM                ATGQSYPFAYKEN--GKLTGFDVEVMEAVAKKIDMKLDWKLLEFSGLMGE
B_subtilis_GlnH_homo_YCKK      TEGTYEPFTYHDKDTDKLTGYDVEVITEVAKRLGLKVDFKETQWGSMFAG
YA80_HAEIN                     TEGTYAPFTFHDK-SGKLTGFDVEVIRKVAEKLGLKVEFKETQWDAMYAG
FLIY_ECOLI                     LEGTYPPFSFQGD-DGKLTGFEVEFAQQLAKHLGVEASLKPTKWDGMLAS
E_coli_GlnH                    TDTAFVPFEFKQG--DKYVGFDVDLWAAIAKELKLDYELKPMDFSGIIPA
Deinococcus_radiodurans        MEGTYPPFTSKNE-QGELVGFDVDIAKAVAQKLNLKPEFVLTEWSGILAG
HISJ_E_COLI                    TDPTYAPFESKNS-QGELVGFDIDLAKELCKRINTQCTFVENPLDALIPS
HISJ_E_COLI                    TDPTYAPFESKNS-QGELVGFDIDLAKELCKRINTQCTFVENPLDALIPS
                                     **       .:  *::::.   : :.   .        ..:

V_Harveyi_PATH                 LETGRIDTISNQITMTDARKAKYLFADPYVVDG-AQI
B_subtilis_YXEM                LQTGKLDTISNQVAVTDERKETYNFTKPYAYAG-TQI
B_subtilis_GlnH_homo_YCKK      LNSKRFDVVANQVG-KTDREDKYDFSDKYTTSR-AVV
YA80_HAEIN                     LNAKRFDVIANQTNPSPERLKKYSFTTPYNYSG-GVI
FLIY_ECOLI                     LDSKRIDVVINQVTISDERKKKYDFSTPYTISGIQAL
E_coli_GlnH                    LQTKNVDLALAGITITDERKKAIDFSDGYYKSG-LLV
Deinococcus_radiodurans        LQANKYDVIVNQVGITPERQNSIGFSQPYAYSRPEII
HISJ_E_COLI                    LKAKKIDAIMSSLSITEKRQQEIAFTDKLYAADSRLV
HISJ_E_COLI                    LKAKKIDAIMSSLSITEKRQQEIAFTDKLYAADSRLV
                               *.: . *        .  *     *:          :

`;

const example3 = `CLUSTAL 2.0.9 multiple sequence alignment


Test1seq             ------------------------------------------------------------
AT3G20900.1-SEQ      ATGAACAAAGTAGCGAGGAAGAACAAAACATCAGGTGAACAAAAAAAAAACTCAATCCAC
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             -----AGTTACAATAACTGACGAAGCTAAGTAGGCTACTAATTAACGTCATCAACCTAAT
AT3G20900.1-SEQ      ATCAAAGTTACAATAACTGACGAAGCTAAGTAGGCTAGAAATTAAAGTCATCAACCTAAT
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             ACATAGCACTTAGAAAAAAGTGAAGTAAGAAAATATAAAATAATAAAAGGGTGGGTTATC
AT3G20900.1-SEQ      ACATAGCACTTAGAAAAAAGTGAAGCAAGAAAATATAAAATAATAAAAGGGTGGGTTATC
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             AATTGATAGTGTAAATCATCGTATTCCGGTGATATACCCTACCACAAAAACTCAAACCGA
AT3G20900.1-SEQ      AATTGATAGTGTAAATCATAGTTGATTTTTGATATACCCTACCACAAAAACTCAAACCGA
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             CTTGATTCAAATCATCTCAATAAATTAGCGCCAAAATAATGAAAAAAATAATAACAAACA
AT3G20900.1-SEQ      CTTGATTCAAATCATCTCAAAAAACAAGCGCCAAAATAATGAAAAAAATAATAACAAAAA
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             AAAACAAACCAAAATAAGAAAAAACATTACGCAAAACATAATAATTTACTCTTCGTTATT
AT3G20900.1-SEQ      CAAACAAACCAAAATAAGAAAAAACATTACGCAAAACATAATAATTTACTCTTCGTTATT
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             GTATTAACAAATCAAAGAGCTGAATTTTGATCACCTGCTAATACTACTTTCTGTATTGAT
AT3G20900.1-SEQ      GTATTAACAAATCAAAGAGATGAATTTTGATCACCTGCTAATACTACTTTCTGTATTGAT
AT3G20900.1-CDS      ------------------------------------------------------------


Test1seq             CCTATATCAACGTAAACAAAGATACTAATAATTAACTAAAAGTACGTTCATCGATCGTGT
AT3G20900.1-SEQ      CCTATATCAAAAAAAAAAAAGATACTAATAATTAACTAAAAGTACGTTCATCGATCGTGT
AT3G20900.1-CDS      ------------------------------------------------------ATGAAC
                                                                             *

Test1seq             TCGTTGACGAAGAAGAGCTCTATCTCCGGCGGAGCAAAGAAAACGATCTGTCTCCGTCGT
AT3G20900.1-SEQ      GCGTTGACGAAGAAGAGCTCTATCTCCGGCGGAGCAAAGAAAACGATCTGTCTCCGTCGT
AT3G20900.1-CDS      AAAGTAGCGAGGAAGAACAAAACATC------AGCAAAGAAAACGATCTGTCTCCGTCGT
                         *  *** ***** *   *  **      ****************************

Test1seq             AACACACGGTCGCTAGAGAAACTTTGCTTCTTCGGCGCCGGTGGACACGTCAGCATCTCC
AT3G20900.1-SEQ      AACACACAGTTTTTCGAGACCCTTTGCTTCTTCGGCGCCGGTGGACACGTCAGCATCTCC
AT3G20900.1-CDS      AACACACAGTTTTTCGAGACCCTTTGCTTCTTCGGCGCCGGTGGACACGTCAGCATCTCC
                     ******* **   * ****  ***************************************

Test1seq             GGTATCCTAGACTTCTTGGCTTTCGGGGTACAACAACCGCGTGGTGACGTCAGCACCGCT
AT3G20900.1-SEQ      GGTATCCTAGACTTCTTGGCTTTCGGGGTACAACAACCGCCTGGTGACGTCAGCACCGCT
AT3G20900.1-CDS      GGTATCCTAGACTTCTTGGCTTTCGGGGTACAACAACCGCCTGGTGACGTCAGCACCGCT
                     **************************************** *******************

Test1seq             GCTGGGGATGGAGAGGGAACAGAGTT-
AT3G20900.1-SEQ      GCTGGGGATGGAGAGGGAACAGAGTAG
AT3G20900.1-CDS      GCTGGGGATGGAGAGGGAACAGAGTAG
                     *************************
`;

const example4 = `Kalign (2.0) alignment in ClustalW format

Test1seq             GCTGGGGATGGAGAGGGAACAGAGTT-
AT3G20900.1-SEQ      GCTGGGGATGGAGAGGGAACAGAGTAG

`;

describe("alignio ported tests", () => {
  beforeEach(() => {});
  it("test one", () => {
    const alignment = parseString(example1);
    expect(alignment.length).toEqual(2);
    expect(alignment[0].id).toEqual("gi|4959044|gb|AAD34209.1|AF069");
    expect(alignment[1].id).toEqual("gi|671626|emb|CAA85685.1|");
    expect(alignment[0].seq).toEqual(
      "MENSDSNDKGSDQSAAQRRSQMDRLDREEAFYQFVNNLSEEDYRLMRDNN" +
        "LLGTPGESTEEELLRRLQQIKEGPPPQSPDENRAGESSDDVTNSDSIIDW" +
        "LNSVRQTGNTTRSRQRGNQSWRAVSRTNPNSGDFRFSLEINVNRNNGSQT" +
        "SENESEPSTRRLSVENMESSSQRQMENSASESASARPSRAERNSTEAVTE" +
        "VPTTRAQRRA"
    );
  });
  it("test two", () => {
    const alignment = parseString(example2);
    expect(alignment.length).toEqual(9);
    expect(alignment[-1].id).toEqual("HISJ_E_COLI");
    expect(alignment[-1]).toEqual(
      "MKKLVLSLSLVLAFSSATAAF-------------------AAIPQNIRIG" +
        "TDPTYAPFESKNS-QGELVGFDIDLAKELCKRINTQCTFVENPLDALIPS" +
        "LKAKKIDAIMSSLSITEKRQQEIAFTDKLYAADSRLV"
    );
  });
  it("test_empy", () => {
    expect(parseString("")).toMatchSnapshot()
  });

  it("test three", () => {
    const alignments = parseString(example3);
  });

  it("test kalign", () => {
    const alignments = parseString(example4);
    expect(alignments.length).toEqual(2);
  });
});
