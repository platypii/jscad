import { EPS } from '../constants.js'

import { sin, cos } from '../utils/trigonometry.js'

import { identity } from './identity.js'

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotate(dest, dest, rad, axis)
 *
 * @param {Mat4} out - receiving matrix
 * @param {number} rad - angle to rotate the matrix by
 * @param {Vec3} axis - axis of which to rotate around
 * @returns {Mat4} out
 * @alias module:modeling/maths/mat4.fromRotation
 * @example
 * let matrix = fromRotation(create(), TAU / 4, [0, 0, 3])
 */
export const fromRotation = (out, rad, axis) => {
  let [x, y, z] = axis
  const lengthSquared = x * x + y * y + z * z

  if (Math.abs(lengthSquared) < EPS) {
    // axis is 0,0,0 or almost
    return identity(out)
  }

  const len = 1 / Math.sqrt(lengthSquared)
  x *= len
  y *= len
  z *= len

  const s = sin(rad)
  const c = cos(rad)
  const t = 1 - c

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c
  out[1] = y * x * t + z * s
  out[2] = z * x * t - y * s
  out[3] = 0
  out[4] = x * y * t - z * s
  out[5] = y * y * t + c
  out[6] = z * y * t + x * s
  out[7] = 0
  out[8] = x * z * t + y * s
  out[9] = y * z * t - x * s
  out[10] = z * z * t + c
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}
