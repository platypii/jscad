/**
 * Calculate the intersect point of the two line segments (p1-p2 and p3-p4).
 * If the endpointTouch parameter is false, intersections at segment end points are excluded.
 * Note: If the line segments do NOT intersect then undefined is returned.
 * @see http://paulbourke.net/geometry/pointlineplane/
 * @param {Vec2} p1 - first point of first line segment
 * @param {Vec2} p2 - second point of first line segment
 * @param {Vec2} p3 - first point of second line segment
 * @param {Vec2} p4 - second point of second line segment
 * @param {boolean} endpointTouch - include intersections at segment endpoints
 * @returns {Vec2} intersection point of the two line segments, or undefined
 * @alias module:modeling/maths/utils.intersect
 */
export const intersect = (p1, p2, p3, p4, endpointTouch = true) => {
  // Check if none of the lines are of length 0
  if ((p1[0] === p2[0] && p1[1] === p2[1]) || (p3[0] === p4[0] && p3[1] === p4[1])) {
    return undefined
  }

  const denominator = ((p4[1] - p3[1]) * (p2[0] - p1[0]) - (p4[0] - p3[0]) * (p2[1] - p1[1]))

  // Lines are parallel
  if (Math.abs(denominator) < Number.MIN_VALUE) {
    return undefined
  }

  const ua = ((p4[0] - p3[0]) * (p1[1] - p3[1]) - (p4[1] - p3[1]) * (p1[0] - p3[0])) / denominator
  const ub = ((p2[0] - p1[0]) * (p1[1] - p3[1]) - (p2[1] - p1[1]) * (p1[0] - p3[0])) / denominator

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return undefined
  }

  // is the intersection at the end of a segment
  if (!endpointTouch && (ua === 0 || ua === 1 || ub === 0 || ub === 1)) {
    return undefined
  }

  // Return the x and y coordinates of the intersection
  const x = p1[0] + ua * (p2[0] - p1[0])
  const y = p1[1] + ua * (p2[1] - p1[1])

  return [x, y]
}
