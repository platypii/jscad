import * as geom3 from '../../geometries/geom3/index.js'
import * as poly3 from '../../geometries/poly3/index.js'

import { runner } from './quickhull/index.js'
import { toUniquePoints } from './toUniquePoints.js'

/*
 * Create a convex hull of the given geometries (geom3).
 * @param {Geom3[]} geometries - a flat list of 3D geometries
 * @returns {Geom3} new geometry
 */
export const hullGeom3 = (geometries) => {
  if (geometries.length === 1) return geometries[0]

  // extract the unique vertices from the geometries
  const unique = toUniquePoints(geometries)

  const faces = runner(unique, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => unique[index])
    return poly3.create(vertices)
  })

  return geom3.create(polygons)
}
