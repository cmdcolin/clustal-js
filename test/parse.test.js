import ClustalParser from '../src'

test('a large clustal', async () => {
  const p = new ClustalParser({
    filename: require.resolve('./data/p53.clustal'),
  })
  const res = await p.parse()
  expect(res).toMatchSnapshot()
})

test('a smaller clustal', async () => {
  const p = new ClustalParser({
    filename: require.resolve('./data/file.aln'),
  })
  const res = await p.parse()
  expect(res).toMatchSnapshot()
})
