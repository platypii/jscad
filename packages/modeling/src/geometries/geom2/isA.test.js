import test from 'ava'

import { isA, create } from './index.js'

test('isA: identifies created geom2', (t) => {
  const p1 = create()
  const p2 = create([[[0, 0], [1, 0], [1, 1]]])
  t.true(isA(p1))
  t.true(isA(p2))
})

test('isA: identifies non geom2', (t) => {
  const p1 = null
  const p2 = {}
  const p3 = { sides: 1, transforms: 1 }
  const p4 = { outlines: 1, transforms: 1 }
  t.false(isA(p1))
  t.false(isA(p2))
  t.false(isA(p3))
  t.false(isA(p4))
})
