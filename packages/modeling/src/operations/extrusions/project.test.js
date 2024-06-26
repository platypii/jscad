import test from 'ava'

import { comparePoints } from '../../../test/helpers/index.js'

import { colorize } from '../../colors/index.js'

import { geom2, geom3 } from '../../geometries/index.js'

import { measureArea } from '../../measurements/index.js'

import { cube, torus } from '../../primitives/index.js'

import { project } from './index.js'

test('project (defaults)', (t) => {
  const geometry0 = geom3.create()
  const geometry1 = cube({ size: 10 })
  const geometry2 = 'hi'
  const geometry3 = undefined
  const geometry4 = null

  const results = project({ }, geometry0, geometry1, geometry2, geometry3, geometry4)
  t.is(results.length, 5)
  t.notThrows(() => geom2.validate(results[0]))
  t.notThrows(() => geom2.validate(results[1]))
  t.is(results[2], geometry2)
  t.is(results[3], geometry3)
  t.is(results[4], geometry4)

  const result = project({ }, torus({ innerSegments: 4, outerSegments: 4 }))
  t.notThrows(() => geom2.validate(result))
  const pts = geom2.toPoints(result)
  const exp = [
    [-5, 0],
    [0, -5],
    [5, 0],
    [0, 5],
    [0, 3],
    [3, 0],
    [0, -3],
    [-3, 0]
  ]
  t.true(comparePoints(pts, exp))
})

test('project torus (X and Y axis)', (t) => {
  let result = project({ axis: [1, 0, 0], origin: [1, 0, 0] }, torus({ outerSegments: 4 }))
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 19.12144515225805)
  let pts = geom2.toPoints(result)
  let exp = [
    [-1, -4],
    [-0.9807852804032304, -4.195090322016128],
    [-0.9238795325112867, -4.38268343236509],
    [-0.8314696123025452, -4.555570233019602],
    [-0.7071067811865475, -4.707106781186548],
    [-0.5555702330196022, -4.831469612302545],
    [-0.3826834323650898, -4.923879532511287],
    [-0.19509032201612825, -4.98078528040323],
    [0, -5],
    [0.19509032201612872, -4.98078528040323],
    [0.3826834323650904, -4.923879532511286],
    [0.5555702330196022, -4.831469612302545],
    [0.7071067811865477, -4.707106781186547],
    [0.8314696123025455, -4.555570233019602],
    [0.9238795325112866, -4.38268343236509],
    [0.9807852804032304, -4.195090322016128],
    [1, -4],
    [1, 0],
    [1, 4],
    [0.9807852804032304, 4.195090322016128],
    [0.9238795325112866, 4.38268343236509],
    [0.8314696123025455, 4.555570233019602],
    [0.7071067811865477, 4.707106781186547],
    [0.5555702330196022, 4.831469612302545],
    [0.3826834323650904, 4.923879532511286],
    [0.19509032201612872, 4.98078528040323],
    [0, 5],
    [-0.19509032201612825, 4.98078528040323],
    [-0.3826834323650898, 4.923879532511287],
    [-0.5555702330196022, 4.831469612302545],
    [-0.7071067811865475, 4.707106781186548],
    [-0.8314696123025452, 4.555570233019602],
    [-0.9238795325112867, 4.38268343236509],
    [-0.9807852804032304, 4.195090322016128],
    [-1, 4],
    [-1, 0]
  ]
  t.true(comparePoints(pts, exp))

  result = project({ axis: [0, 1, 0], origin: [0, -1, 0] }, torus({ outerSegments: 4 }))
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 19.12144515225805)
  pts = geom2.toPoints(result)
  exp = [
    [-5, 0],
    [-4.98078528040323, -0.19509032201612825],
    [-4.923879532511287, -0.3826834323650898],
    [-4.831469612302545, -0.5555702330196022],
    [-4.707106781186548, -0.7071067811865475],
    [-4.555570233019602, -0.8314696123025452],
    [-4.38268343236509, -0.9238795325112867],
    [-4.195090322016128, -0.9807852804032304],
    [-4, -1],
    [0, -1],
    [4, -1],
    [4.195090322016128, -0.9807852804032304],
    [4.38268343236509, -0.9238795325112867],
    [4.555570233019602, -0.8314696123025452],
    [4.707106781186548, -0.7071067811865475],
    [4.831469612302545, -0.5555702330196022],
    [4.923879532511287, -0.3826834323650898],
    [4.98078528040323, -0.19509032201612825],
    [5, 0],
    [4.98078528040323, 0.19509032201612872],
    [4.923879532511286, 0.3826834323650904],
    [4.831469612302545, 0.5555702330196022],
    [4.707106781186547, 0.7071067811865477],
    [4.555570233019602, 0.8314696123025455],
    [4.38268343236509, 0.9238795325112866],
    [4.195090322016128, 0.9807852804032304],
    [4, 1],
    [0, 1],
    [-4, 1],
    [-4.195090322016128, 0.9807852804032304],
    [-4.38268343236509, 0.9238795325112866],
    [-4.555570233019602, 0.8314696123025455],
    [-4.707106781186547, 0.7071067811865477],
    [-4.831469612302545, 0.5555702330196022],
    [-4.923879532511286, 0.3826834323650904],
    [-4.98078528040323, 0.19509032201612872]
  ]
  t.true(comparePoints(pts, exp))
})

test('project torus (martinez issue #155)', (t) => {
  const result = project(
    { axis: [0, 1, 0], origin: [0, -1, 0] },
    torus({ innerSegments: 8, outerSegments: 4 })
  )
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 21.15545050788201)
})

test('project: preserves color', (t) => {
  const redCube = colorize([1, 0, 0], cube())
  const result = project({ }, redCube)
  t.deepEqual(result.color, [1, 0, 0, 1])
})

test('project: empty geometry', (t) => {
  const obj = geom3.create()
  const result = project({ }, obj)
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 0)
})
