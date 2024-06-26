import { clone } from './clone.js'

/**
 * Reverses the path so that the points are in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {Path2} geometry - the path to reverse
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.reverse
 *
 * @example
 * let newPath = reverse(myPath)
 */
export const reverse = (geometry) => {
  // NOTE: this only updates the order of the points
  const cloned = clone(geometry)
  cloned.points = geometry.points.slice().reverse()
  return cloned
}
