import * as path2 from '../../geometries/path2/index.js'

import { expand } from '../expansions/index.js'

import { extrudeLinearGeom2 } from './extrudeLinearGeom2.js'

/*
 * Expand and extrude the given geometry (path2).
 * @See expand for addition options
 * @param {Object} options - options for extrusion, if any
 * @param {Number} [options.size=1] - size of the rectangle
 * @param {Number} [options.height=1] - height of the extrusion
 * @param {path2} geometry - the geometry to extrude
 * @return {geom3} the extruded geometry
 */
export const extrudeRectangularPath2 = (options, geometry) => {
  const defaults = {
    size: 1,
    height: 1
  }
  const { size, height } = Object.assign({ }, defaults, options)

  options.delta = size
  options.offset = [0, 0, height]

  const points = path2.toPoints(geometry)
  if (points.length === 0) throw new Error('the given geometry cannot be empty')

  const newGeometry = expand(options, geometry)
  return extrudeLinearGeom2(options, newGeometry)
}
