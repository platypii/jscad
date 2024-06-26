import * as mat4 from '../../maths/mat4/index.js'

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the points, as this function only adjusts the transforms.
 * The transforms are applied when accessing the points via toPoints().
 * @param {Mat4} matrix - the matrix to transform with
 * @param {Path2} geometry - the geometry to transform
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.transform
 *
 * @example
 * let newPath = transform(fromZRotation(TAU / 8), path)
 */
export const transform = (matrix, geometry) => {
  const transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms)
  return Object.assign({}, geometry, { transforms })
}
