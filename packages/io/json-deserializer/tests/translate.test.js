import test from 'ava'

import { deserialize } from '../src/index.js'

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('translate JSON notation to JSCAD script', (t) => {
  let observed = deserialize({ output: 'script', addMetaData: false }, json1)
  t.is(countOf('main', observed), 2)
  t.is(countOf('const json', observed), 1)

  observed = deserialize({ filename: 'json2', output: 'script', addMetaData: true }, json2)
  t.is(countOf('main', observed), 2)
  t.is(countOf('const json', observed), 1)

  observed = deserialize({ filename: 'json3', output: 'script', addMetaData: true }, json3)
  t.is(countOf('main', observed), 2)
  t.is(countOf('const json', observed), 1)

  observed = deserialize({ filename: 'json4', output: 'script', addMetaData: true }, json4)
  t.is(countOf('main', observed), 2)
  t.is(countOf('const json', observed), 1)

  observed = deserialize({ filename: 'json5', output: 'script', addMetaData: false }, json5)
  t.is(countOf('main', observed), 2)
  t.is(countOf('const json', observed), 2)

  observed = deserialize({ filename: 'json6', output: 'script', addMetaData: false }, json6)
  t.is(countOf('main', observed), 2)
  t.is(countOf('const json', observed), 1)
})

// JSON notations for tests
const json1 = '{}'

const json2 = '[{"polygons":[{"vertices":[[-15,-15,-15],[-15,-15,15],[-15,15,15],[-15,15,-15]],"plane":[-1,0,0,15]},{"vertices":[[15,-15,-15],[15,15,-15],[15,15,15],[15,-15,15]],"plane":[1,0,0,15]},{"vertices":[[-15,-15,-15],[15,-15,-15],[15,-15,15],[-15,-15,15]],"plane":[0,-1,0,15]},{"vertices":[[-15,15,-15],[-15,15,15],[15,15,15],[15,15,-15]],"plane":[0,1,0,15]},{"vertices":[[-15,-15,-15],[-15,15,-15],[15,15,-15],[15,-15,-15]],"plane":[0,0,-1,15]},{"vertices":[[-15,-15,15],[15,-15,15],[15,15,15],[-15,15,15]],"plane":[0,0,1,15]}],"isRetesselated":false,"transforms":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}]'

const json3 = '[{"outlines":[[[4.6193976402282715,-2.678784132003784],[5,0],[4.6193976402282715,2.678784132003784],[3.535533905029297,4.949747562408447],[1.9134172201156616,6.467156887054443],[3.0616169991140216e-16,7],[-1.9134172201156616,6.467156887054443],[-3.535533905029297,4.949747562408447],[-4.6193976402282715,2.678784132003784],[-5,8.572527703398379e-16],[-4.6193976402282715,-2.678784132003784],[-3.535533905029297,-4.949747562408447],[-1.9134172201156616,-6.467156887054443],[-9.184850467946473e-16,-7],[1.9134172201156616,-6.467156887054443],[3.535533905029297,-4.949747562408447]]],"transforms":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"color":[1,0,0,1],"name":"this is a name"}]'

const json4 = '[{"points":[[34.985713958740234,163.35238647460938],[49.39168167114258,179.00868225097656],[57.22199630737305,198.7909393310547],[57.43418502807617,220.06549072265625],[50,240]],"isClosed":false,"transforms":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"color":[1,0,0,1]}]'

const json5 = '[{"outlines":[[[4.6193976402282715,-2.678784132003784],[5,0],[4.6193976402282715,2.678784132003784],[3.535533905029297,4.949747562408447],[1.9134172201156616,6.467156887054443],[3.0616169991140216e-16,7],[-1.9134172201156616,6.467156887054443],[-3.535533905029297,4.949747562408447],[-4.6193976402282715,2.678784132003784],[-5,8.572527703398379e-16],[-4.6193976402282715,-2.678784132003784],[-3.535533905029297,-4.949747562408447],[-1.9134172201156616,-6.467156887054443],[-9.184850467946473e-16,-7],[1.9134172201156616,-6.467156887054443],[3.535533905029297,-4.949747562408447]]],"transforms":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"color":[1,0,0,1],"name":"this is a name"},{"points":[[34.985713958740234,163.35238647460938],[49.39168167114258,179.00868225097656],[57.22199630737305,198.7909393310547],[57.43418502807617,220.06549072265625],[50,240]],"isClosed":false,"transforms":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"color":[1,0,0,1]}]'

// non-JSCAD object
const json6 = '[{"statistics":[[34.985713958740234,163.35238647460938],[49.39168167114258,179.00868225097656],[57.22199630737305,198.7909393310547],[57.43418502807617,220.06549072265625],[50,240]],"average":123.456}]'
