import { retessellate } from '../modifiers/retessellate.js'

import { unionGeom3Sub } from './unionGeom3Sub.js'

/*
 * Return a new 3D geometry representing the space in the given 3D geometries.
 * @param {Geom3[]} geometries - a flat list of 3D geometries to union
 * @returns {Geom3} new 3D geometry
 */
export const unionGeom3 = (geometries) => {
  // combine geometries in a way that forms a balanced binary tree pattern
  let i
  for (i = 1; i < geometries.length; i += 2) {
    geometries.push(unionGeom3Sub(geometries[i - 1], geometries[i]))
  }
  let newGeometry = geometries[i - 1]
  newGeometry = retessellate(newGeometry)
  return newGeometry
}
