import 'three/src/helpers/GridHelper'

import { Object3D } from './Object3D'

export class Floor3D extends Object3D {
	constructor(props) {
		super(props)
		const material = new Three.MeshPhysicalMaterial()
		const geometry = new Three.PlaneBufferGeometry(10, 10)
		const plane = new Three.Mesh(geometry, material)
		plane.rotation.x = Math.PI / -2
		plane.receiveShadow = true
		plane.castShadow = true

		const grid = new Three.GridHelper(10, 10)

		this.object = new Three.Group()
		this.object.add(plane)
		this.object.add(grid)

		new Three.TextureLoader().setPath('/ss-virtual-showroom/assets/').load('UV_Grid_Sm.jpg', texture => {
			texture.mapping = Three.UVMapping
			texture.wrapS = Three.RepeatWrapping
			texture.wrapT = Three.RepeatWrapping
			texture.repeat.set(1, 1)
			material.map = texture
			material.needsUpdate = true
		})
	}
}
