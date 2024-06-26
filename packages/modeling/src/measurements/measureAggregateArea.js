import { flatten } from '../utils/flatten.js'

import { measureArea } from './measureArea.js'

/**
 * Measure the total (aggregate) area for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {number} the total surface area for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateArea
 *
 * @example
 * let totalArea = measureAggregateArea(sphere(),cube())
 */
export const measureAggregateArea = (...geometries) => {
  geometries = flatten(geometries)
  const areas = measureArea(geometries)
  if (geometries.length === 1) {
    return areas
  }
  const result = 0
  return areas.reduce((result, area) => result + area, result)
}
