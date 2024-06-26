import test from 'ava'

import { create, copy, fromValues } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('plane: copy() with two params should update a plane with same values', (t) => {
  const org1 = create()
  const plane1 = fromValues(0, 0, 0, 0)
  const ret1 = copy(org1, plane1)
  t.true(compareVectors(org1, [0, 0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0, 0]))
  t.not(ret1, plane1)
  t.is(ret1, org1)

  const org2 = create()
  const plane2 = fromValues(1, 2, 3, 4)
  const ret2 = copy(org2, plane2)
  t.true(compareVectors(org2, [1, 2, 3, 4]))
  t.true(compareVectors(ret2, [1, 2, 3, 4]))
  t.not(ret2, plane2)
  t.is(ret2, org2)

  const org3 = create()
  const plane3 = fromValues(-1, -2, -3, -4)
  const ret3 = copy(org3, plane3)
  t.true(compareVectors(org3, [-1, -2, -3, -4]))
  t.true(compareVectors(ret3, [-1, -2, -3, -4]))
  t.not(ret3, plane3)
  t.is(ret3, org3)
})
