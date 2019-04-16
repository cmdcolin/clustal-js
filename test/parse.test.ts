import { parse } from "../src";
import * as fs from "fs";

test("a large clustal", async () => {
  const ret = fs.readFileSync(require.resolve("./data/p53.clustal"), "utf8");
  const res = await parse(ret);
  expect(res).toMatchSnapshot();
});

test("a smaller clustal", async () => {
  const ret = fs.readFileSync(require.resolve("./data/file.aln"), "utf8");
  const res = await parse(ret);
  expect(res).toMatchSnapshot();
});
