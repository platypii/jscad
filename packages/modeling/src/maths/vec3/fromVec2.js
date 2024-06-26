/**
 * Create a new vector by extending a 2D vector with a Z value.
 *
 * @param {Vec3} out - receiving vector
 * @param {Array} vector - 2D vector of values
 * @param {number} [z=0] - Z value
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.fromVec2
 */
export const fromVec2 = (out, vector, z = 0) => {
  out[0] = vector[0]
  out[1] = vector[1]
  out[2] = z
  return out
}
