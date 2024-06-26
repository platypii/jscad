import { dot } from './dot.js'

/**
 * Calculate the angle between two vectors.
 *
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {number} angle (radians)
 * @alias module:modeling/maths/vec3.angle
 */
export const angle = (a, b) => {
  const ax = a[0]
  const ay = a[1]
  const az = a[2]
  const bx = b[0]
  const by = b[1]
  const bz = b[2]
  const mag1 = Math.sqrt(ax * ax + ay * ay + az * az)
  const mag2 = Math.sqrt(bx * bx + by * by + bz * bz)
  const mag = mag1 * mag2
  const cosine = mag && dot(a, b) / mag
  return Math.acos(Math.min(Math.max(cosine, -1), 1))
}
