import fs from 'fs'
import path from 'path'

import test from 'ava'

import { deserialize } from '../src/index.js'

const samplesPath = '../../../node_modules/@jscad/sample-files'

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('translate simple ascii stl to jscad code', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/testcube_ascii.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const expected = `import * from '@jscad/modeling'

//
// solid 1 : 36 points, 12 faces, 0 colors
//
const solid1 = () => {
  const points = [
    [1,0,0],
    [1,1,0],
    [0,0,0],
    [1,1,0],
    [0,1,0],
    [0,0,0],
    [0,1,0],
    [0,1,1],
    [0,0,0],
    [0,1,1],
    [0,0,1],
    [0,0,0],
    [1,1,0],
    [1,1,1],
    [0,1,0],
    [1,1,1],
    [0,1,1],
    [0,1,0],
    [1,1,1],
    [1,1,0],
    [1,0,0],
    [1,0,1],
    [1,1,1],
    [1,0,0],
    [1,0,1],
    [1,0,0],
    [0,0,0],
    [0,0,1],
    [1,0,1],
    [0,0,0],
    [1,1,1],
    [1,0,1],
    [0,0,1],
    [0,1,1],
    [1,1,1],
    [0,0,1],
  ]
  const faces = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [9,10,11],
    [12,13,14],
    [15,16,17],
    [18,19,20],
    [21,22,23],
    [24,25,26],
    [27,28,29],
    [30,31,32],
    [33,34,35],
  ]
  const colors = null
  return polyhedron({points, faces, colors, orientation: 'inside'})
}

export const main = () => {
 return [solid1()]
}
`

  const observed = deserialize({ filename: 'ascii', output: 'script', addMetaData: false }, inputFile)
  t.deepEqual(observed, expected)
})

test('translate simple binary stl to jscad script', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/testcube_10mm.stl')
  const inputFile = fs.readFileSync(inputPath)

  const expected = `import * from '@jscad/modeling'

//
// solid 1 : 36 points, 12 faces, 0 colors
//
const solid1 = () => {
  const points = [
    [5,-5,5],
    [5,-5,-5],
    [-5,-5,-5],
    [-5,-5,5],
    [5,-5,5],
    [-5,-5,-5],
    [5,-5,-5],
    [5,5,-5],
    [-5,5,-5],
    [-5,-5,-5],
    [5,-5,-5],
    [-5,5,-5],
    [5,-5,5],
    [5,5,5],
    [5,5,-5],
    [5,-5,-5],
    [5,-5,5],
    [5,5,-5],
    [-5,-5,5],
    [-5,5,5],
    [5,5,5],
    [5,-5,5],
    [-5,-5,5],
    [5,5,5],
    [-5,-5,-5],
    [-5,5,-5],
    [-5,5,5],
    [-5,-5,5],
    [-5,-5,-5],
    [-5,5,5],
    [5,5,5],
    [-5,5,5],
    [-5,5,-5],
    [5,5,-5],
    [5,5,5],
    [-5,5,-5],
  ]
  const faces = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [9,10,11],
    [12,13,14],
    [15,16,17],
    [18,19,20],
    [21,22,23],
    [24,25,26],
    [27,28,29],
    [30,31,32],
    [33,34,35],
  ]
  const colors = null
  return polyhedron({points, faces, colors, orientation: 'inside'})
}

export const main = () => {
 return [solid1()]
}
`

  const observed = deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.deepEqual(observed, expected)
})

test('translate stl with colors to jscad script', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/colors.stl')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('points', observed), 3) // comment, definition, useage
  t.is(countOf('faces', observed), 3)
  t.is(countOf('colors', observed), 3)
  t.is(countOf('colors = [', observed), 1)
  t.is(countOf('polyhedron', observed), 1)
})
