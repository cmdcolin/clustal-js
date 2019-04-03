import { parseFile } from "../src";

test("a large clustal", async () => {
  const res = await parseFile(require.resolve("./data/p53.clustal"));
  expect(res).toMatchSnapshot();
});

test("a smaller clustal", async () => {
  const res = await parseFile(require.resolve("./data/file.aln"));
  expect(res).toMatchSnapshot();
});
