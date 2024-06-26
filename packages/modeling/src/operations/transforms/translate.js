import * as mat4 from '../../maths/mat4/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'

/**
 * Translate the given objects using the given options.
 * @param {Array} offset - offset (vector) of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translate
 *
 * @example
 * const newSphere = translate([5, 0, 10], sphere())
 */
export const translate = (offset, ...objects) => {
  if (!Array.isArray(offset)) throw new Error('offset must be an array')

  // adjust the offset if necessary
  offset = offset.slice() // don't modify the original
  while (offset.length < 3) offset.push(0)

  const matrix = mat4.fromTranslation(mat4.create(), offset)

  const results = objects.map((object) => {
    if (path2.isA(object)) return path2.transform(matrix, object)
    if (geom2.isA(object)) return geom2.transform(matrix, object)
    if (geom3.isA(object)) return geom3.transform(matrix, object)
    // handle recursive arrays
    if (Array.isArray(object)) return translate(offset, ...object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

/**
 * Translate the given objects along the X axis using the given options.
 * @param {number} offset - X offset of which to translate the objects
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateX
 */
export const translateX = (offset, ...objects) => translate([offset, 0, 0], ...objects)

/**
 * Translate the given objects along the Y axis using the given options.
 * @param {number} offset - Y offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateY
 */
export const translateY = (offset, ...objects) => translate([0, offset, 0], ...objects)

/**
 * Translate the given objects along the Z axis using the given options.
 * @param {number} offset - Z offset of which to translate the geometries
 * @param {...Object} objects - the objects to translate
 * @return {Object|Array} the translated object, or a list of translated objects
 * @alias module:modeling/transforms.translateZ
 */
export const translateZ = (offset, ...objects) => translate([0, 0, offset], ...objects)
