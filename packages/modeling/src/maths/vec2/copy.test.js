import test from 'ava'

import { copy, create, fromValues } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: copy() with two params should update a vec2 with same values', (t) => {
  const out1 = create()
  const org1 = fromValues(0, 0)
  const ret1 = copy(out1, org1)
  t.true(compareVectors(out1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))
  t.not(ret1, org1)
  t.is(out1, ret1)

  const out2 = create()
  const org2 = fromValues(1, 2)
  const ret2 = copy(out2, org2)
  t.true(compareVectors(out2, [1, 2]))
  t.true(compareVectors(ret2, [1, 2]))
  t.not(ret2, org2)
  t.is(out2, ret2)

  const out3 = create()
  const org3 = fromValues(-1, -2)
  const ret3 = copy(out3, org3)
  t.true(compareVectors(out3, [-1, -2]))
  t.true(compareVectors(ret3, [-1, -2]))
  t.not(ret3, org3)
  t.is(out3, ret3)
})
