import test from 'ava'

import { countOf } from '../../test/helpers/countOf.js'

import { colorize, cube, cuboid, geom3 } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('serialize empty 3D geometry to obj', (t) => {
  const emptyShape = geom3.create()
  const observed1 = serialize({}, emptyShape)
  t.deepEqual(observed1, expected1)
})

test('serialize 3D geometry to obj', (t) => {
  const testCube = cube()
  const observed2 = serialize({}, testCube)
  t.is(observed2.length, 1)
  const obj2 = observed2[0]
  t.is(countOf('Wavefront OBJ file generated by JSCAD', obj2), 1)
  t.is(countOf('v ', obj2), 8) // vertices
  // t.is(countOf('vn ', obj2), 8) // vertex normals
  t.is(countOf('f ', obj2), 12) // faces
  t.is(countOf('usemtl ', obj2), 0) // colors
  t.deepEqual(observed2, expected2)
})

test('serialize non-triangulated 3D geometry to obj', (t) => {
  const testCube = cube()
  const observed3 = serialize({ triangulate: false }, testCube)
  t.is(observed3.length, 1)
  const obj3 = observed3[0]
  t.is(countOf('Wavefront OBJ file generated by JSCAD', obj3), 1)
  t.is(countOf('v ', obj3), 8) // vertices
  // t.is(countOf('vn ', obj3), 8) // vertex normals
  t.is(countOf('f ', obj3), 6) // faces
  t.is(countOf('usemtl ', obj3), 0) // colors
  t.deepEqual(observed3, expected3)
})

test('serialize color 3D geometry to obj', (t) => {
  const testCubes = [
    colorize([1, 0.8, 0.8], cuboid({})),
    cuboid({ center: [0, 3, 0] })
  ]
  const observed4 = serialize({ triangulate: false }, testCubes)
  t.is(observed4.length, 1)
  const obj4 = observed4[0]
  t.is(countOf('Wavefront OBJ file generated by JSCAD', obj4), 1)
  t.is(countOf('v ', obj4), 16) // vertices
  t.is(countOf('f ', obj4), 12) // faces
  t.is(countOf('usemtl ', obj4), 2) // colors
  t.deepEqual(observed4, expected4)
})

const expected1 = [`# Wavefront OBJ file generated by JSCAD


`]

const expected2 = [`# Wavefront OBJ file generated by JSCAD

v -1 -1 -1
v -1 -1 1
v -1 1 1
v -1 1 -1
v 1 -1 -1
v 1 1 -1
v 1 1 1
v 1 -1 1

f 1 2 3
f 1 3 4
f 5 6 7
f 5 7 8
f 1 5 8
f 1 8 2
f 4 3 7
f 4 7 6
f 1 4 6
f 1 6 5
f 2 8 7
f 2 7 3
`]

const expected3 = [`# Wavefront OBJ file generated by JSCAD

v -1 -1 -1
v -1 -1 1
v -1 1 1
v -1 1 -1
v 1 -1 -1
v 1 1 -1
v 1 1 1
v 1 -1 1

f 1 2 3 4
f 5 6 7 8
f 1 5 8 2
f 4 3 7 6
f 1 4 6 5
f 2 8 7 3
`]

const expected4 = [`# Wavefront OBJ file generated by JSCAD

v -1 -1 -1
v -1 -1 1
v -1 1 1
v -1 1 -1
v 1 -1 -1
v 1 1 -1
v 1 1 1
v 1 -1 1

usemtl pink
f 1 2 3 4
f 5 6 7 8
f 1 5 8 2
f 4 3 7 6
f 1 4 6 5
f 2 8 7 3

v -1 2 -1
v -1 2 1
v -1 4 1
v -1 4 -1
v 1 2 -1
v 1 4 -1
v 1 4 1
v 1 2 1

usemtl default
f 9 10 11 12
f 13 14 15 16
f 9 13 16 10
f 12 11 15 14
f 9 12 14 13
f 10 16 15 11
`]
