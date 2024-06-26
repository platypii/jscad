import { flatten } from '@jscad/array-utils'

import { parse } from './parse.js'
import { instantiateDefinitions } from './instantiateDefinitions.js'
import { x3dTypes } from './objects.js'

export const instantiate = (options, src) => {
  const defaults = {
  }
  options = Object.assign({}, defaults, options)

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  // parse the X3D source
  const { x3dObj } = parse(src)

  if (x3dObj.definition !== x3dTypes.X3D || (!x3dObj.objects)) throw new Error('X3D malformed')
  if (x3dObj.objects.length < 1 || x3dObj.objects[0].definition !== x3dTypes.SCENE) throw new Error('X3D did not define a SCENE')

  options && options.statusCallback && options.statusCallback({ progress: 50 })

  // convert the X3D object structure to JSCAD geometry (API calls)
  const scene = x3dObj.objects[0] // instantiate starts here
  const objects = scene.objects

  let geometries = instantiateDefinitions(options, objects)
  if (options.flatten) geometries = flatten(geometries)

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return geometries
}
