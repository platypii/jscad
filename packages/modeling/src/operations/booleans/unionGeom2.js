const flatten = require('../../utils/flatten')

const boolean = require('./martinez')
const { UNION } = require('./martinez/operation')

/*
 * Return a new 2D geometry representing the total space in the given 2D geometries.
 * @param {...geom2} geometries - list of 2D geometries to union
 * @returns {geom2} new 2D geometry
 */
const union = (...geometries) => {
  geometries = flatten(geometries)

  let newgeometry = geometries.shift()
  geometries.forEach((geometry) => {
    newgeometry = boolean(newgeometry, geometry, UNION)
  })

  return newgeometry
}

module.exports = union
