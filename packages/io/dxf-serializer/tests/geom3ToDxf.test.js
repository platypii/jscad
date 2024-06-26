import test from 'ava'

import { cube, geom3 } from '@jscad/modeling'

import { serialize } from '../src/index.js'
import { dxfHeaders, dxfClasses, dxfTables, dxfBlocks, dxfObjects } from '../src/autocad_AC2017.js'

test('3D Geometry to DXF 3DFACE', (t) => {
  const csg1 = geom3.create()

  const obs1 = serialize({}, csg1)
  const exp1 = [empty]
  t.deepEqual(obs1, exp1)

  const csg2 = cube()
  t.is(csg2.polygons.length, 6)

  const obs2 = serialize({}, csg2)
  const exp2 = [threeface1]
  t.deepEqual(obs2, exp2)
})

test('3D Geometry to DXF POLYLINE FACES', (t) => {
  const csg1 = geom3.create()

  const obs1 = serialize({ geom3To: 'polyline' }, csg1)
  const exp1 = [empty]
  t.deepEqual(obs1, exp1)

  const csg2 = cube()
  t.is(csg2.polygons.length, 6)

  const obs2 = serialize({ geom3To: 'polyline' }, csg2)
  const exp2 = [polyline1]
  t.deepEqual(obs2, exp2)
})

const empty = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`

const threeface1 = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
3DFACE
  5
CAD00001
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
-1
  11
-1
  21
-1
  31
1
  12
-1
  22
1
  32
1
  13
-1
  23
1
  33
1
  0
3DFACE
  5
CAD00002
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
-1
  11
-1
  21
1
  31
1
  12
-1
  22
1
  32
-1
  13
-1
  23
1
  33
-1
  0
3DFACE
  5
CAD00003
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
1
  20
-1
  30
-1
  11
1
  21
1
  31
-1
  12
1
  22
1
  32
1
  13
1
  23
1
  33
1
  0
3DFACE
  5
CAD00004
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
1
  20
-1
  30
-1
  11
1
  21
1
  31
1
  12
1
  22
-1
  32
1
  13
1
  23
-1
  33
1
  0
3DFACE
  5
CAD00005
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
-1
  11
1
  21
-1
  31
-1
  12
1
  22
-1
  32
1
  13
1
  23
-1
  33
1
  0
3DFACE
  5
CAD00006
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
-1
  11
1
  21
-1
  31
1
  12
-1
  22
-1
  32
1
  13
-1
  23
-1
  33
1
  0
3DFACE
  5
CAD00007
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
1
  30
-1
  11
-1
  21
1
  31
1
  12
1
  22
1
  32
1
  13
1
  23
1
  33
1
  0
3DFACE
  5
CAD00008
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
1
  30
-1
  11
1
  21
1
  31
1
  12
1
  22
1
  32
-1
  13
1
  23
1
  33
-1
  0
3DFACE
  5
CAD00009
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
-1
  11
-1
  21
1
  31
-1
  12
1
  22
1
  32
-1
  13
1
  23
1
  33
-1
  0
3DFACE
  5
CAD0000A
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
-1
  11
1
  21
1
  31
-1
  12
1
  22
-1
  32
-1
  13
1
  23
-1
  33
-1
  0
3DFACE
  5
CAD0000B
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
1
  11
1
  21
-1
  31
1
  12
1
  22
1
  32
1
  13
1
  23
1
  33
1
  0
3DFACE
  5
CAD0000C
  100
AcDbEntity
  8
0
  62
256
  100
AcDbFace
  70
0
  10
-1
  20
-1
  30
1
  11
1
  21
1
  31
1
  12
-1
  22
1
  32
1
  13
-1
  23
1
  33
1
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`

const polyline1 = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
POLYLINE
  5
CAD00001
  100
AcDbEntity
  3
CAD00001
  8
0
  62
256
  100
AcDb3dPolyline
  70
64
  71
36
  72
12
  0
VERTEX
  5
CAD00002
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD00003
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00004
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00005
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD00006
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00007
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD00008
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD00009
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD0000A
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD0000B
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD0000C
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD0000D
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD0000E
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD0000F
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD00010
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00011
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD00012
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00013
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00014
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD00015
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00016
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00017
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD00018
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00019
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD0001A
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD0001B
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD0001C
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD0001D
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD0001E
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
-1
  70
192
  0
VERTEX
  5
CAD0001F
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
-1
  70
192
  0
VERTEX
  5
CAD00020
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00021
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00022
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00023
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
-1
  30
1
  70
192
  0
VERTEX
  5
CAD00024
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00025
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
-1
  20
1
  30
1
  70
192
  0
VERTEX
  5
CAD00026
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
1
  72
2
  73
3
  74
0
  0
VERTEX
  5
CAD00027
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
4
  72
5
  73
6
  74
0
  0
VERTEX
  5
CAD00028
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
7
  72
8
  73
9
  74
0
  0
VERTEX
  5
CAD00029
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
10
  72
11
  73
12
  74
0
  0
VERTEX
  5
CAD0002A
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
13
  72
14
  73
15
  74
0
  0
VERTEX
  5
CAD0002B
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
16
  72
17
  73
18
  74
0
  0
VERTEX
  5
CAD0002C
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
19
  72
20
  73
21
  74
0
  0
VERTEX
  5
CAD0002D
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
22
  72
23
  73
24
  74
0
  0
VERTEX
  5
CAD0002E
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
25
  72
26
  73
27
  74
0
  0
VERTEX
  5
CAD0002F
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
28
  72
29
  73
30
  74
0
  0
VERTEX
  5
CAD00030
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
31
  72
32
  73
33
  74
0
  0
VERTEX
  5
CAD00031
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
34
  72
35
  73
36
  74
0
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`
