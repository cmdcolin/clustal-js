import { test, expect } from 'vitest'
import { parse } from '../src'
import * as fs from 'fs'

test('a large clustal', async () => {
  const ret = fs.readFileSync('test/data/p53.clustal', 'utf8')
  const res = parse(ret)
  expect(res).toMatchSnapshot()
})

test('a smaller clustal', async () => {
  const ret = fs.readFileSync('test/data/file.aln', 'utf8')
  const res = parse(ret)
  expect(res).toMatchSnapshot()
})

test('a larger clustal', async () => {
  const ret = fs.readFileSync('test/data/out.aln', 'utf8')
  const res = parse(ret)
  fs.writeFileSync('out.txt', JSON.stringify(res.alns))
  expect(res).toMatchSnapshot()
})
