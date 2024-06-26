import test from 'ava'

import { rgbToHex } from './index.js'

test('rgbToHex', (t) => {
  let obs = rgbToHex([1, 0, 0.5])
  let exp = '#ff007f'

  t.deepEqual(obs, exp)

  obs = rgbToHex(1, 0, 0.5, 0.8)
  exp = '#ff007fcc'

  t.deepEqual(obs, exp)
})
