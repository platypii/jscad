import { flatten } from '../utils/flatten.js'

import { measureVolume } from './measureVolume.js'

/**
 * Measure the total (aggregate) volume for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {number} the volume for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateVolume
 *
 * @example
 * let totalVolume = measureAggregateVolume(sphere(),cube())
 */
export const measureAggregateVolume = (...geometries) => {
  geometries = flatten(geometries)
  const volumes = measureVolume(geometries)
  if (geometries.length === 1) {
    return volumes
  }
  const result = 0
  return volumes.reduce((result, volume) => result + volume, result)
}
