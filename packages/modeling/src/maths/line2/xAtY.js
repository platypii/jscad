import { origin } from './origin.js'

/**
 * Determine the X coordinate of the given line at the Y coordinate.
 *
 * The X coordinate will be Infinity if the line is parallel to the X axis.
 *
 * @param {Line2} line - line of reference
 * @param {number} y - Y coordinate on the line
 * @return {number} the X coordinate on the line
 * @alias module:modeling/maths/line2.xAtY
 */
export const xAtY = (line, y) => {
  let x = (line[2] - (line[1] * y)) / line[0]
  if (Number.isNaN(x)) {
    const org = origin(line)
    x = org[0]
  }
  return x
}
