import test from 'ava'

import { snap, create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec3: snap() should return vec3 with correct values', (t) => {
  const output = create()

  const obs1 = snap(output, [0, 0, 0], 0.1)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(output, [0, 0, 0]))

  const obs2 = snap(output, [1, 2, 3], 0.1)
  t.true(compareVectors(obs2, [1, 2, 3]))
  t.true(compareVectors(output, [1, 2, 3]))

  const obs3 = snap(output, [-1, -2, -3], 0.01)
  t.true(compareVectors(obs3, [-1, -2, -3]))
  t.true(compareVectors(output, [-1, -2, -3]))

  const obs4 = snap(output, [-1.123456789, -2.123456789, -3.123456789], 0.01)
  t.true(compareVectors(obs4, [-1.12, -2.12, -3.12]))
  t.true(compareVectors(output, [-1.12, -2.12, -3.12]))

  const obs5 = snap(output, [-1.123456789, -2.123456789, -3.123456789], 0.0001)
  t.true(compareVectors(obs5, [-1.1235, -2.1235, -3.1235]))
  t.true(compareVectors(output, [-1.1235, -2.1235, -3.1235]))

  const obs6 = snap(output, [-1.123456789, -2.123456789, -3.123456789], 0.000001)
  t.true(compareVectors(obs6, [-1.123457, -2.1234569999999997, -3.1234569999999997]))
  t.true(compareVectors(output, [-1.123457, -2.1234569999999997, -3.1234569999999997]))
})
