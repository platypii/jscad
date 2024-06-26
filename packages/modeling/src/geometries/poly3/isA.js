/**
 * Determine if the given object is a polygon.
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly3
 * @alias module:modeling/geometries/poly3.isA
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('vertices' in object) {
      if (Array.isArray(object.vertices)) {
        return true
      }
    }
  }
  return false
}
