import { EPS, TAU } from '../maths/constants.js'

import * as vec2 from '../maths/vec2/index.js'

import * as geom2 from '../geometries/geom2/index.js'

import { sin, cos } from '../maths/utils/trigonometry.js'

import { isGTE, isNumberArray } from './commonChecks.js'

/**
 * Construct an axis-aligned ellipse in two dimensional space.
 * @see https://en.wikipedia.org/wiki/Ellipse
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of ellipse
 * @param {Array} [options.radius=[1,1]] - radius of ellipse, along X and Y
 * @param {number} [options.startAngle=0] - start angle of ellipse, in radians
 * @param {number} [options.endAngle=TAU] - end angle of ellipse, in radians
 * @param {number} [options.segments=32] - number of segments to create per full rotation
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.ellipse
 * @example
 * let myshape = ellipse({radius: [5,10]})
 */
export const ellipse = (options) => {
  const defaults = {
    center: [0, 0],
    radius: [1, 1],
    startAngle: 0,
    endAngle: TAU,
    segments: 32
  }
  let { center, radius, startAngle, endAngle, segments } = Object.assign({}, defaults, options)

  if (!isNumberArray(center, 2)) throw new Error('center must be an array of X and Y values')
  if (!isNumberArray(radius, 2)) throw new Error('radius must be an array of X and Y values')
  if (!radius.every((n) => n >= 0)) throw new Error('radius values must be positive')
  if (!isGTE(startAngle, 0)) throw new Error('startAngle must be positive')
  if (!isGTE(endAngle, 0)) throw new Error('endAngle must be positive')
  if (!isGTE(segments, 3)) throw new Error('segments must be three or more')

  // if any radius is zero return empty geometry
  if (radius[0] === 0 || radius[1] === 0) return geom2.create()

  startAngle = startAngle % TAU
  endAngle = endAngle % TAU

  let rotation = TAU
  if (startAngle < endAngle) {
    rotation = endAngle - startAngle
  }
  if (startAngle > endAngle) {
    rotation = endAngle + (TAU - startAngle)
  }

  const minRadius = Math.min(radius[0], radius[1])
  const minAngle = Math.acos(((minRadius * minRadius) + (minRadius * minRadius) - (EPS * EPS)) /
                            (2 * minRadius * minRadius))
  if (rotation < minAngle) throw new Error('startAngle and endAngle do not define a significant rotation')

  segments = Math.floor(segments * (rotation / TAU))

  const centerV = vec2.clone(center)
  const step = rotation / segments // radians per segment

  const points = []
  segments = (rotation < TAU) ? segments + 1 : segments
  for (let i = 0; i < segments; i++) {
    const angle = (step * i) + startAngle
    const point = vec2.fromValues(radius[0] * cos(angle), radius[1] * sin(angle))
    vec2.add(point, centerV, point)
    points.push(point)
  }
  if (rotation < TAU) points.push(centerV)
  return geom2.create([points])
}
