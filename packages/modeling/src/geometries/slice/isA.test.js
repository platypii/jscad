import test from 'ava'

import { isA, create, fromVertices } from './index.js'

test('isA: identifies created slice', (t) => {
  const p1 = create()
  const p2 = fromVertices([[0, 0], [1, 0], [1, 1]])
  t.true(isA(p1))
  t.true(isA(p2))
})

test('isA: identifies non slice', (t) => {
  const p1 = null
  const p2 = { }
  const p3 = { edges: 1 }
  t.false(isA(p1))
  t.false(isA(p2))
  t.false(isA(p3))
})
