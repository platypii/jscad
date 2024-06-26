import * as poly3 from '../poly3/index.js'

/**
 * Return the given geometry in compact binary representation.
 * @param {Geom3} geometry - the geometry
 * @return {TypedArray} compact binary representation
 * @alias module:modeling/geometries/geom3.toCompactBinary
 */
export const toCompactBinary = (geometry) => {
  const polygons = geometry.polygons
  const transforms = geometry.transforms

  const numberOfPolygons = polygons.length
  const numberOfVertices = polygons.reduce((count, polygon) => count + polygon.vertices.length, 0)
  let color = [-1, -1, -1, -1]
  if (geometry.color) color = geometry.color

  // FIXME why Float32Array?
  const compacted = new Float32Array(1 + 16 + 4 + 1 + numberOfPolygons + (numberOfVertices * 3))
  // type + transforms + color + numberOfPolygons + numberOfVerticesPerPolygon[] + vertices data[]

  compacted[0] = 1 // type code: 0 => geom2, 1 => geom3 , 2 => path2

  compacted[1] = transforms[0]
  compacted[2] = transforms[1]
  compacted[3] = transforms[2]
  compacted[4] = transforms[3]
  compacted[5] = transforms[4]
  compacted[6] = transforms[5]
  compacted[7] = transforms[6]
  compacted[8] = transforms[7]
  compacted[9] = transforms[8]
  compacted[10] = transforms[9]
  compacted[11] = transforms[10]
  compacted[12] = transforms[11]
  compacted[13] = transforms[12]
  compacted[14] = transforms[13]
  compacted[15] = transforms[14]
  compacted[16] = transforms[15]

  compacted[17] = color[0]
  compacted[18] = color[1]
  compacted[19] = color[2]
  compacted[20] = color[3]

  compacted[21] = numberOfVertices

  let ci = 22
  let vi = ci + numberOfPolygons
  polygons.forEach((polygon) => {
    const vertices = poly3.toVertices(polygon)
    // record the number of vertices per polygon
    compacted[ci] = vertices.length
    ci++
    // convert the vertices
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i]
      compacted[vi + 0] = vertex[0]
      compacted[vi + 1] = vertex[1]
      compacted[vi + 2] = vertex[2]
      vi += 3
    }
  })
  // TODO: how about custom properties or fields ?
  return compacted
}
