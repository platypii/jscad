/*
 * Implementation of the Martinez 2D polygon clipping algorithm
 * Copyright (c) 2018 Alexander Milevski
 * https://github.com/w8r/martinez
 */

import { Tree } from './splaytree.js'
import { computeFields } from './computeFields.js'
import { possibleIntersection } from './possibleIntersection.js'
import { compareSegments } from './compareSegments.js'
import {
  INTERSECTION,
  DIFFERENCE
} from './operation.js'
import { compactEvent, edgeName, edgeShort, name } from './logging.js'

export const subdivideSegments = (eventQueue, subject, clipping, sbbox, cbbox, operation) => {
  const sweepLine = new Tree(compareSegments)
  const sortedEvents = []

  const rightBound = Math.min(sbbox[2], cbbox[2])

  let prev, next, begin

  while (eventQueue.length !== 0) {
    let event = eventQueue.pop()
    sortedEvents.push(event)
    console.log('sweep1', edgeShort(event))
    const name = edgeName(event)
    if (name === 'CD') {
      // console.log(`sweep1 otherEvent ${edgeName(event.otherEvent)}`)
      // console.log(`sweep1 prev ${edgeName(sweepLine.prev(event))}`)
    }
    if (name === 'JF') {
      console.log(`sweep1 ${name} y no split?`)
      // console.log('sweep1 y no split?', name, compactEvent(event, sortedEvents))
      eventQueue.requeue()
      let n = sweepLine._root
      const active = []
      while (n) {
        active.push(n.key)
        n = sweepLine.next(n)
      }
      console.log("tree", active.map(edgeName).join())
    }
    // optimization by bboxes for intersection and difference goes here
    if ((operation === INTERSECTION && event.point[0] > rightBound) ||
        (operation === DIFFERENCE && event.point[0] > sbbox[2])) {
      break
    }

    if (event.left) {
      next = prev = sweepLine.insert(event)
      begin = sweepLine.minNode()

      if (prev !== begin) prev = sweepLine.prev(prev)
      else prev = null

      next = sweepLine.next(next)

      const prevEvent = prev ? prev.key : null
      let prevprevEvent
      computeFields(event, prevEvent, operation)
      if (next) {
        if (name === 'JF' || name === 'CD') console.log(`sweep1 ${name} next`, edgeName(next.key))
        if (possibleIntersection(event, next.key, eventQueue) === 2) {
          computeFields(event, prevEvent, operation)
          computeFields(next.key, event, operation)
        }
      }

      if (prev) {
        if (name === 'JF' || name === 'CD') console.log(`sweep1 ${name} prev`, edgeName(prev.key))
        if (possibleIntersection(prev.key, event, eventQueue) === 2) {
          // console.log("possibleIntersection 2", compactEvent(event, sortedEvents))
          let prevprev = prev
          if (prevprev !== begin) prevprev = sweepLine.prev(prevprev)
          else prevprev = null

          prevprevEvent = prevprev ? prevprev.key : null
          computeFields(prevEvent, prevprevEvent, operation)
          computeFields(event, prevEvent, operation)
        }
      }
    } else {
      event = event.otherEvent
      next = prev = sweepLine.find(event)

      if (prev && next) {
        if (prev !== begin) prev = sweepLine.prev(prev)
        else prev = null

        next = sweepLine.next(next)
        sweepLine.remove(event)

        if (next && prev) {
          possibleIntersection(prev.key, next.key, eventQueue)
        }
      }
    }
  }
  return sortedEvents
}
