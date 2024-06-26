import { create } from './create.js'

/**
 * Create a polygon from the given vertices and plane.
 * NOTE: No checks are performed on the parameters.
 * @param {Array} vertices - list of vertices (3D)
 * @param {Plane} plane - plane of the polygon
 * @returns {Poly3} a new polygon
 * @alias module:modeling/geometries/poly3.fromVerticesAndPlane
 */
export const fromVerticesAndPlane = (vertices, plane) => {
  const poly = create(vertices)
  poly.plane = plane // retain the plane for later use
  return poly
}
