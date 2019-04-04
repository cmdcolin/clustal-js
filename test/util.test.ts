import { parseVersion } from "../src/util";
test("versions", () => {
  expect(parseVersion("CLUSTAL (1.2.3)")).toEqual("1.2.3");
  expect(parseVersion("CLUSTALW (1.2.3)")).toEqual("1.2.3");
  expect(parseVersion("CLUSTAL W(1.2.3)")).toEqual("1.2.3");
  expect(parseVersion("CLUSTAL W (1.2.3)")).toEqual("1.2.3");
  expect(parseVersion("CLUSTAL 1.2.3")).toEqual("1.2.3");
  expect(
    parseVersion("CLUSTAL multiple sequence alignment by MUSCLE (3.8)")
  ).toEqual("3.8");
  expect(
    parseVersion("CLUSTAL format alignment by MAFFT FFT-NS-i (v7.397)")
  ).toEqual("7.397");
});
