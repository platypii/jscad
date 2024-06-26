/**
 * Normalize the given vector.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector to normalize
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.normalize
 */
export const normalize = (out, vector) => {
  const x = vector[0]
  const y = vector[1]
  let len = x * x + y * y
  if (len > 0) {
    len = 1 / Math.sqrt(len)
  }
  out[0] = x * len
  out[1] = y * len
  return out
}
