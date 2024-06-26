import * as mat4 from 'gl-mat4'
import * as vec3 from 'gl-vec3'

export const cameraState = {
  view: mat4.identity(new Float32Array(16)),
  projection: mat4.identity(new Float32Array(16)),
  matrix: mat4.identity(new Float32Array(16)), // not sure if needed
  near: 1, // 0.01,
  far: 18000,
  up: [0, 0, 1],
  // distance: 10.0, // not sure if needed
  eye: new Float32Array(3), // same as position
  position: [450, 550, 700],
  target: [0, 0, 0],
  fov: Math.PI / 4,
  aspect: 1,
  viewport: [0, 0, 0, 0],
  projectionType: 'perspective'
}

export const cameraProps = {}
export const defaults = Object.assign({}, cameraState, cameraProps)

export const setProjection = (output, camera, input) => {
  // context.viewportWidth / context.viewportHeight,
  const aspect = input.width / input.height

  const projection = mat4.perspective(mat4.identity([]), camera.fov, aspect,
    camera.near,
    camera.far)
  const viewport = [0, 0, input.width, input.height]

  // optional mutation
  const out = output || {}
  out.projection = projection
  out.aspect = aspect
  out.viewport = viewport

  return out
}

export const update = (output, camera) => {
  if (!camera) {
    camera = output
  }
  const { position, target, up } = camera
  const offset = vec3.subtract([], position, target)
  const newPosition = vec3.add(vec3.create(), target, offset)
  const newView = mat4.lookAt(mat4.create(), newPosition, target, up)

  // optional mutation
  const out = output || {}
  out.position = newPosition
  out.view = newView
  return out
}
