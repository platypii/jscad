import { NEPS } from '../constants.js'

/*
 * Returns zero if n is within epsilon of zero, otherwise return n
 */
const rezero = (n) => Math.abs(n) < NEPS ? 0 : n

/**
 * Return Math.sin but accurate for TAU / 4 rotations.
 * Fixes rounding errors when sin should be 0.
 *
 * @param {number} radians - angle in radians
 * @returns {number} sine of the given angle
 * @alias module:modeling/utils.sin
 * @example
 * sin(TAU / 2) == 0
 * sin(TAU) == 0
 */
export const sin = (radians) => rezero(Math.sin(radians))

/**
 * Return Math.cos but accurate for TAU / 4 rotations.
 * Fixes rounding errors when cos should be 0.
 *
 * @param {number} radians - angle in radians
 * @returns {number} cosine of the given angle
 * @alias module:modeling/utils.cos
 * @example
 * cos(TAU * 0.25) == 0
 * cos(TAU * 0.75) == 0
 */
export const cos = (radians) => rezero(Math.cos(radians))
