import * as mat4 from '../../maths/mat4/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'

/**
 * Scale the given objects using the given options.
 * @param {Array} factors - X, Y, Z factors by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scale
 *
 * @example
 * let myshape = scale([5, 0, 10], sphere())
 */
export const scale = (factors, ...objects) => {
  if (!Array.isArray(factors)) throw new Error('factors must be an array')

  // adjust the factors if necessary
  factors = factors.slice() // don't modify the original
  while (factors.length < 3) factors.push(1)

  if (factors[0] <= 0 || factors[1] <= 0 || factors[2] <= 0) throw new Error('factors must be positive')

  const matrix = mat4.fromScaling(mat4.create(), factors)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    // handle recursive arrays
    if (Array.isArray(object)) return scale(factors, ...object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Scale the given objects about the X axis using the given options.
 * @param {number} factor - X factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleX
 */
export const scaleX = (factor, ...objects) => scale([factor, 1, 1], ...objects)

/**
 * Scale the given objects about the Y axis using the given options.
 * @param {number} factor - Y factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleY
 */
export const scaleY = (factor, ...objects) => scale([1, factor, 1], ...objects)

/**
 * Scale the given objects about the Z axis using the given options.
 * @param {number} factor - Z factor by which to scale the objects
 * @param {...Object} objects - the objects to scale
 * @return {Object|Array} the scaled object, or a list of scaled objects
 * @alias module:modeling/transforms.scaleZ
 */
export const scaleZ = (factor, ...objects) => scale([1, 1, factor], ...objects)
