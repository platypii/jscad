import test from 'ava'

import { fromValues } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec4: fromValues() should return a new vec4 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0, 0)
  t.true(compareVectors(obs1, [0, 0, 0, 0]))

  const obs2 = fromValues(5, 4, 3, 2)
  t.true(compareVectors(obs2, [5, 4, 3, 2]))

  const obs3 = fromValues(-5, -4, -3, -2)
  t.true(compareVectors(obs3, [-5, -4, -3, -2]))
})
