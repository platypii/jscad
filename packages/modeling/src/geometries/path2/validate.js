import * as vec2 from '../../maths/vec2/index.js'

import { isA } from './isA.js'

/**
 * Determine if the given object is a valid path2.
 * Checks for valid data points, and duplicate points.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/path2.validate
 */
export const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid path2 structure')
  }

  // check for duplicate points
  if (object.points.length > 1) {
    for (let i = 0; i < object.points.length; i++) {
      if (vec2.equals(object.points[i], object.points[(i + 1) % object.points.length])) {
        throw new Error(`path2 has duplicate point ${object.points[i]}`)
      }
    }
  }

  // check for infinity, nan
  object.points.forEach((point) => {
    if (!point.every(Number.isFinite)) {
      throw new Error(`path2 invalid point ${point}`)
    }
  })

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`path2 invalid transforms ${object.transforms}`)
  }
}
