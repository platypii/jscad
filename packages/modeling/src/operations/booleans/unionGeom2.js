import { UNION } from './martinez/operation.js'
import { boolean } from './martinez/index.js'

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {Geom2[]} geometries - a flat list of 2D geometries to union
 * @returns {Geom2} new 2D geometry
 */
export const unionGeom2 = (geometries) => {
  let newGeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newGeometry = boolean(newGeometry, geometry, UNION)
  })

  return newGeometry
}
