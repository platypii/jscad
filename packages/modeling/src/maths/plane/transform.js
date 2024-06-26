import * as mat4 from '../mat4/index.js'
import * as vec3 from '../vec3/index.js'

import { fromPoints } from './fromPoints.js'
import { flip } from './flip.js'

/**
 * Transform the given plane using the given matrix
 *
 * @param {Plane} out - receiving plane
 * @param {Plane} plane - plane to transform
 * @param {Mat4} matrix - matrix to transform with
 * @return {Plane} out
 * @alias module:modeling/maths/plane.transform
 */
export const transform = (out, plane, matrix) => {
  const isMirror = mat4.isMirroring(matrix)
  // get two vectors in the plane:
  const r = vec3.orthogonal(vec3.create(), plane)
  const u = vec3.cross(r, plane, r)
  const v = vec3.cross(vec3.create(), plane, u)
  // get 3 points in the plane:
  let point1 = vec3.fromScalar(vec3.create(), plane[3])
  vec3.multiply(point1, point1, plane)
  let point2 = vec3.add(vec3.create(), point1, u)
  let point3 = vec3.add(vec3.create(), point1, v)
  // transform the points:
  point1 = vec3.transform(point1, point1, matrix)
  point2 = vec3.transform(point2, point2, matrix)
  point3 = vec3.transform(point3, point3, matrix)
  // and create a new plane from the transformed points:
  fromPoints(out, point1, point2, point3)
  if (isMirror) {
    // the transform is mirroring so flip the plane
    flip(out, out)
  }
  return out
}
