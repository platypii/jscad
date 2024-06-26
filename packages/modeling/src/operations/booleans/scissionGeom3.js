import * as vec3 from '../../maths/vec3/index.js'

import { measureEpsilon } from '../../measurements/measureEpsilon.js'

import * as geom3 from '../../geometries/geom3/index.js'

// returns array numerically sorted and duplicates removed
const sortNb = (array) => array.sort((a, b) => a - b).filter((item, pos, ary) => !pos || item !== ary[pos - 1])

const insertMapping = (map, vertex, index) => {
  const key = `${vertex}`
  const mapping = map.get(key)
  if (mapping === undefined) {
    map.set(key, [index])
  } else {
    mapping.push(index)
  }
}

const findMapping = (map, vertex) => {
  const key = `${vertex}`
  return map.get(key)
}

export const scissionGeom3 = (geometry) => {
  // construit table de correspondance entre polygones
  // build polygons lookup table
  const eps = measureEpsilon(geometry)
  const polygons = geom3.toPolygons(geometry)
  const pl = polygons.length

  const indexesPerVertex = new Map()
  const temp = vec3.create()
  polygons.forEach((polygon, index) => {
    polygon.vertices.forEach((vertex) => {
      insertMapping(indexesPerVertex, vec3.snap(temp, vertex, eps), index)
    })
  })

  const indexesPerPolygon = polygons.map((polygon) => {
    let indexes = []
    polygon.vertices.forEach((vertex) => {
      indexes = indexes.concat(findMapping(indexesPerVertex, vec3.snap(temp, vertex, eps)))
    })
    return { e: 1, d: sortNb(indexes) } // for each polygon, push the list of indexes
  })

  indexesPerVertex.clear()

  // regroupe les correspondances des polygones se touchant
  // boucle ne s'arrêtant que quand deux passages retournent le même nb de polygones
  // merge lookup data from linked polygons as long as possible
  let merges = 0
  const ippl = indexesPerPolygon.length
  for (let i = 0; i < ippl; i++) {
    const mapi = indexesPerPolygon[i]
    // merge mappings if necessary
    if (mapi.e > 0) {
      const indexes = new Array(pl)
      indexes[i] = true // include ourself
      do {
        merges = 0
        // loop through the known indexes
        indexes.forEach((e, j) => {
          const mapj = indexesPerPolygon[j]
          // merge this mapping if necessary
          if (mapj.e > 0) {
            mapj.e = -1 // merged
            for (let d = 0; d < mapj.d.length; d++) {
              indexes[mapj.d[d]] = true
            }
            merges++
          }
        })
      } while (merges > 0)
      mapi.indexes = indexes
    }
  }

  // construit le tableau des geometry à retourner
  // build array of geometry to return
  const newgeometries = []
  for (let i = 0; i < ippl; i++) {
    if (indexesPerPolygon[i].indexes) {
      const newpolygons = []
      indexesPerPolygon[i].indexes.forEach((e, p) => newpolygons.push(polygons[p]))
      newgeometries.push(geom3.create(newpolygons))
    }
  }

  return newgeometries
}
