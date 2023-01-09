/**
 * Serializer of JSCAD geometries to X3D source data (XML).
 *
 * The serialization of the following geometries are possible.
 * - serialization of 3D geometries (geom3) to X3D IndexedTriangleSet (a unique mesh containing coordinates)
 * - serialization of 2D geometries (geom2) to X3D Polyline2D
 * - serialization of 2D paths (path2) to X3D Polyline2D
 *
 * Material (color) is added to X3D shapes when found on the geometry.
 *
 * @module io/x3d-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/x3d-serializer')
 */

import { geometries, modifiers } from '@jscad/modeling'
const { geom2, geom3, path2, poly2, poly3 } = geometries

import { flatten, toArray } from '@jscad/array-utils'

import { stringify } from '@jscad/io-utils'

const mimeType = 'model/x3d+xml'

/**
 * Serialize the give objects to X3D elements (XML).
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Array} [options.color=[0,0,1,1]] - default color for objects
 * @param {Boolean} [options.metadata=true] - add metadata to 3MF contents, such at CreationDate
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {Object|Array} objects - objects to serialize as X3D
 * @returns {Array} serialized contents, X3D format (XML)
 * @alias module:io/x3d-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const x3dData = serializer({unit: 'meter'}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    color: [0, 0, 1, 1.0], // default colorRGBA specification
    decimals: 1000,
    metadata: true,
    unit: 'millimeter', // millimeter, inch, feet, meter or micrometer
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  objects = objects.filter((object) => geom3.isA(object) || geom2.isA(object) || path2.isA(object))

  if (objects.length === 0) throw new Error('expected one or more geom3/geom2/path2 objects')

  options.statusCallback && options.statusCallback({ progress: 0 })

  // construct the contents of the XML
  let body = ['X3D',
    {
      profile: 'Interchange',
      version: '4.0',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsd:noNamespaceSchemaLocation': 'http://www.web3d.org/specifications/x3d-4.0.xsd'
    }
  ]
  if (options.metadata) {
    body.push(['head', {},
      ['meta', { name: 'creator', content: 'Created by JSCAD' }],
      ['meta', { name: 'reference', content: 'https://www.openjscad.xyz' }],
      ['meta', { name: 'created', content: new Date().toISOString()}]
    ])
  } else {
    body.push(['head', {},
      ['meta', { name: 'creator', content: 'Created by JSCAD' }],
    ])
  }
  body = body.concat(convertObjects(objects, options))

  // convert the contents to X3D (XML) format
  const contents = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body, 2)}`

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return [contents]
}

const convertObjects = (objects, options) => {
  let scene = ['Scene', {}]
  const shapes = []
  objects.forEach((object, i) => {
    options.statusCallback && options.statusCallback({ progress: 100 * i / objects.length })

    if (geom3.isA(object)) {
      // convert to triangles
      object = modifiers.generalize({ snap: true, triangulate: true }, object)
      const polygons = geom3.toPolygons(object)
      if (polygons.length > 0) {
        shapes.push(convertGeom3(object, options))
      }
    }
    if (geom2.isA(object)) {
      shapes.push(convertGeom2(object, options))
    }
    if (path2.isA(object)) {
      shapes.push(convertPath2(object, options))
    }
  })
  scene = scene.concat(shapes)
  return [scene]
}

/*
 * Convert the given object (path2) to X3D source
 */
const convertPath2 = (object, options) => {
  const points = path2.toPoints(object).slice()
  if (points.length > 1 && object.isClosed) points.push(points[0])
  const shape = ['Shape', {}, convertPolyline2D(poly2.create(points), options)]
  if (object.color) {
    shape.push(convertAppearance(object, options))
  }
  return shape
}

/*
 * Convert the given object (geom2) to X3D source
 */
const convertGeom2 = (object, options) => {
  const outlines = geom2.toOutlines(object)
  const group = ['Group', {}]
  outlines.forEach((outline) => {
    if (outline.length > 1) outline.push(outline[0]) // close the outline for conversion
    const shape = ['Shape', {}, convertPolyline2D(poly2.create(outline), options)]
    if (object.color) {
      shape.push(convertAppearance(object, options))
    }
    group.push(shape)
  })
  return group
}

/*
 * Convert the given object (poly2) to X3D source
 */
const convertPolyline2D = (object, options) => {
  const lineSegments = object.vertices.map((p) => `${p[0]} ${p[1]}`).join(' ')
  return ['Polyline2D', {lineSegments}]
}

const convertAppearance = (object, options) => {
  const diffuseColor = object.color.join(' ')
  const emissiveColor = object.color.join(' ')
  return ['Appearance', ['Material', {diffuseColor, emissiveColor}]]
}

/*
 * Convert the given object (geom3) to X3D source
 */
const convertGeom3 = (object, options) => {
  const shape = ['Shape', {}, convertMesh(object, options)]
  if (object.color) {
    shape.push(convertAppearance(object, options))
  }
  return shape
}

const convertMesh = (object, options) => {
  const mesh = convertToTriangles(object, options)
  const lists = polygons2coordinates(mesh, options)

  const indexList = lists[0].join(' ')
  const pointList = lists[1].join(' ')
  const colorList = lists[2].join(' ')

  const faceset = [
    'IndexedTriangleSet',
    { ccw: 'true', colorPerVertex: 'false', solid: 'false', index: indexList },
    ['Coordinate', { point: pointList }],
  ]
  if (! object.color) {
    faceset.push(['Color', { color: colorList }])
  }
  return faceset
}

const convertToTriangles = (object, options) => {
  const triangles = []
  const polygons = geom3.toPolygons(object)
  polygons.forEach((poly) => {
    const firstVertex = poly.vertices[0]
    for (let i = poly.vertices.length - 3; i >= 0; i--) {
      const triangle = poly3.fromPoints([
        firstVertex,
        poly.vertices[i + 1],
        poly.vertices[i + 2]
      ])

      let color = options.color
      if (object.color) color = object.color
      if (poly.color) color = poly.color
      triangle.color = color

      triangles.push(triangle)
    }
  })
  return triangles
}

const convertToColor = (polygon, options) => {
  let color = options.color
  if (polygon.color) color = polygon.color

  return `${color[0]} ${color[1]} ${color[2]}`
}

/*
 * This function converts the given polygons into three lists
 * - indexList : index of each vertex in the triangle (tuples)
 * - pointList : coordinates of each vertex (X Y Z)
 * - colorList : color of each triangle (R G B)
 */
const polygons2coordinates = (polygons, options) => {
  const indexList = []
  const pointList = []
  const colorList = []

  const vertexTagToCoordIndexMap = new Map()
  polygons.forEach((polygon) => {
    const polygonVertexIndices = []
    const numvertices = polygon.vertices.length
    for (let i = 0; i < numvertices; i++) {
      const vertex = polygon.vertices[i]
      const id = `${vertex[0]},${vertex[1]},${vertex[2]}`

      // add the vertex to the list of points (and index) if not found
      if (!vertexTagToCoordIndexMap.has(id)) {
        const x = Math.round(vertex[0] * options.decimals) / options.decimals
        const y = Math.round(vertex[1] * options.decimals) / options.decimals
        const z = Math.round(vertex[2] * options.decimals) / options.decimals
        pointList.push(`${x} ${y} ${z}`)
        vertexTagToCoordIndexMap.set(id, pointList.length - 1)
      }
      // add the index (of the vertex) to the list for this polygon
      polygonVertexIndices.push(vertexTagToCoordIndexMap.get(id))
    }
    indexList.push(polygonVertexIndices.join(' '))
    colorList.push(convertToColor(polygon, options))
  })
  vertexTagToCoordIndexMap.clear()

  return [indexList, pointList, colorList]
}

export {
  serialize,
  mimeType
}