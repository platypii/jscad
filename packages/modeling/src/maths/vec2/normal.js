import { TAU } from '../constants.js'

import { create } from './create.js'
import { rotate } from './rotate.js'

/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degrees.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - given value
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.normal
 */
export const normal = (out, vector) => rotate(out, vector, create(), (TAU / 4))
