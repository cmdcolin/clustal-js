import ClustalParser from '../src'

test('wtf', async () => {
  const p = new ClustalParser({
    filename: require.resolve('./data/p53.clustal'),
  })
  await p.parse()
  expect(1).toEqual(1)
})
