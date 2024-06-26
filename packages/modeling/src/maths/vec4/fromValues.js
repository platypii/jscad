import { create } from './create.js'

/**
 * Creates a new vector with the given values.
 *
 * @param {number} x - X component
 * @param {number} y - Y component
 * @param {number} z - Z component
 * @param {number} w - W component
 * @returns {Vec4} a new vector
 * @alias module:modeling/maths/vec4.fromValues
 */
export const fromValues = (x, y, z, w) => {
  const out = create()
  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  return out
}
