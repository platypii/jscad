import * as vec3 from '../vec3/index.js'

/**
 * Compare the given lines for equality.
 *
 * @param {Line3} line1 - first line to compare
 * @param {Line3} line2 - second line to compare
 * @return {Boolean} true if lines are equal
 * @alias module:modeling/maths/line3.equals
 */
export const equals = (line1, line2) => {
  // compare directions (unit vectors)
  if (!vec3.equals(line1[1], line2[1])) return false

  // compare points
  if (!vec3.equals(line1[0], line2[0])) return false

  // why would lines with the same slope (direction) and different points be equal?
  // let distance = distanceToPoint(line1, line2[0])
  // if (distance > EPS) return false

  return true
}
