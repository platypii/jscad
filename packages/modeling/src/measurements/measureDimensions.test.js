import test from 'ava'

import { geom2, geom3, path2, slice } from '../geometries/index.js'

import { line, rectangle, cuboid } from '../primitives/index.js'

import { measureDimensions } from './measureDimensions.js'

test('measureDimensions (single objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle()
  const acube = cuboid()

  const apath2 = path2.create()
  const ageom2 = geom2.create()
  const ageom3 = geom3.create()
  const aslice = slice.create()

  const n = null
  const o = {}
  const x = 'hi'

  const lbounds = measureDimensions(aline)
  const rbounds = measureDimensions(arect)
  const cbounds = measureDimensions(acube)

  const p2bounds = measureDimensions(apath2)
  const g2bounds = measureDimensions(ageom2)
  const g3bounds = measureDimensions(ageom3)
  const slbounds = measureDimensions(aslice)

  const nbounds = measureDimensions(n)
  const obounds = measureDimensions(o)
  const xbounds = measureDimensions(x)

  t.deepEqual(lbounds, [5, 5, 0])
  t.deepEqual(rbounds, [2, 2, 0])
  t.deepEqual(cbounds, [2, 2, 2])

  t.deepEqual(p2bounds, [0, 0, 0])
  t.deepEqual(g2bounds, [0, 0, 0])
  t.deepEqual(g3bounds, [0, 0, 0])
  t.deepEqual(slbounds, [0, 0, 0])

  t.deepEqual(nbounds, [0, 0, 0])
  t.deepEqual(obounds, [0, 0, 0])
  t.deepEqual(xbounds, [0, 0, 0])
})

test('measureDimensions (multiple objects)', (t) => {
  const aline = line([[10, 10], [15, 15]])
  const arect = rectangle({ size: [10, 20] })
  const acube = cuboid()
  const o = {}

  let allbounds = measureDimensions(aline, arect, acube, o)
  t.deepEqual(allbounds, [[5, 5, 0], [10, 20, 0], [2, 2, 2], [0, 0, 0]])

  allbounds = measureDimensions(aline, arect, acube, o)
  t.deepEqual(allbounds, [[5, 5, 0], [10, 20, 0], [2, 2, 2], [0, 0, 0]])
})
