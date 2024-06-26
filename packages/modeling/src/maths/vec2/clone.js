import { create } from './create.js'

/**
 * Create a clone of the given vector.
 *
 * @param {Vec2} vector - vector to clone
 * @returns {Vec2} a new vector
 * @alias module:modeling/maths/vec2.clone
 */
export const clone = (vector) => {
  const out = create()
  out[0] = vector[0]
  out[1] = vector[1]
  return out
}
