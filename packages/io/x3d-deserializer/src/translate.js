import { translateDefinitions } from './translateDefinitions.js'
import { x3dTypes } from './objects.js'
import { parse } from './parse.js'

export const translate = (options, src) => {
  const defaults = {
  }
  options = Object.assign({}, defaults, options)
  const { version, addMetaData, filename } = options

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  // parse the X3D source
  const { x3dObj, x3dMaterials, x3dTextures } = parse(src)

  // convert the internal objects to JSCAD code
  let code = addMetaData
    ? `//
// Produced by JSCAD IO Library : X3D Deserializer (${version})
// date: ${new Date()}
// source: ${filename}
//
`
    : ''

  if (!x3dObj) {
    throw new Error('X3D parsing failed, no valid X3D data retrieved')
  }

  options && options.statusCallback && options.statusCallback({ progress: 50 })

  code += codify(x3dObj, { x3dMaterials, x3dTextures })

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return code
}

//
// convert the internal representation into JSCAD code
//
const codify = (x3d, data) => {
  if (x3d.definition !== x3dTypes.X3D || (!x3d.objects)) throw new Error('X3D malformed')

  if (x3d.objects.length < 1 || x3d.objects[0].definition !== x3dTypes.SCENE) throw new Error('X3D did not define a SCENE')

  const scene = x3d.objects[0] // translation starts here
  const objects = scene.objects
  const length = x3d.length
  const angle = x3d.angle

  let code = ''

  // start everthing
  code = `// Objects  : ${objects.length}
// Units : ${length.name} (${length.factor})
// Angles : ${angle.name} (${angle.factor})

import * from '@jscad/modeling'

export const main = () => {
  let options = {}
  let objects = []
`

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i]
    code += `  objects.push(...createObjects${obj.id}(options))\n`
  }

  code += '  return objects\n}\n'

  code += translateDefinitions({}, objects)

  return code
}
