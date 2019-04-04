export function parseVersion(line: string): string {
  const res = line.match(/\(?(\d+(\.\d+)+)\)?/);
  return res && res.length > 1 ? res[1] : "";
}

export function getFirstNonEmptyLine(arr: Symbol.iterator): Results {
  // There should be two blank lines after the header line
  let line = arr.next().value;
  while (line !== undefined && line.trim() === "") {
    line = arr.next().value;
  }
  return line;
}
