import { rectangle } from './rectangle.js'
import { isGTE } from './commonChecks.js'

/**
 * Construct an axis-aligned square in two dimensional space with four equal sides at right angles.
 * @see [rectangle]{@link module:modeling/primitives.rectangle} for more options
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {number} [options.size=2] - dimension of square
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.square
 *
 * @example
 * let myshape = square({size: 10})
 */
export const square = (options) => {
  const defaults = {
    center: [0, 0],
    size: 2
  }
  let { center, size } = Object.assign({}, defaults, options)

  if (!isGTE(size, 0)) throw new Error('size must be positive')

  size = [size, size]

  return rectangle({ center, size })
}
