# three-x
Simple and easy to use react components for advanced 3D using WebGL and Thrree.js

## Installation
```
npm install three-x
```

## Basic Usages
```jsx
import { Viewport, Environment, SunLight, Ground, OBJLoader } from 'three-x'

const Room = OBJLoader('assets/room.obj')
const Table = OBJLoader('assets/table.obj')
const Chair = OBJLoader('assets/chair.obj')
const Sofa = OBJLoader('assets/sofa.obj')

function MyComponent(props) {
  return (
    <Viewport fov={45}>
      <Environment />
      <SunLight />
      <Ground />
      <Room>
        <Sofa />
        <Table />
        <Chair />
        <Chair />
        <Chair />
        <Chair />
      </Room>
    </Viewport>
  )
}
```
