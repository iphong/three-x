import 'three/examples/js/loaders/OBJLoader'
import 'three/examples/js/loaders/MTLLoader'
import 'three/examples/js/loaders/ColladaLoader'

import { Object3D } from './Object3D'
window.m = new Three.MeshNormalMaterial()

export class File3D extends Object3D {
	objLoader = new Three.OBJLoader()
	matLoader = new Three.MTLLoader()
	colladaLoader = new Three.ColladaLoader()
	componentDidMount() {
		this.matLoader.setPath('/ss-virtual-showroom/assets/').load(this.props.mtl, material => {
			console.log(material)
			console.log('fdsfgdsf')
			// material.preload()
			this.objLoader
				.setMaterials(material)
				.setPath('/ss-virtual-showroom/assets/')
				.load(this.props.obj, object => {
					console.log(object)
					this.object = this.enhance(object)
					if (this.parent) this.parent.object.add(this.object)
				})
		})
		// this.colladaLoader.load('/ss-virtual-showroom/assets/' + this.props.dae, object => {
		// 	console.log(object)
		// 	this.object = this.enhance(object.scene)
		// 	if (this.parent) this.parent.object.add(this.object)
		// })
	}
	enhance = object => {
		if (object.type === 'Mesh') {
			object.castShadow = true
			object.receiveShadow = true
			const materials = Array.isArray(object.material) ? object.material : [object.material]
			materials.forEach(material => {
				// console.log(material)
				// material.color.set('red')
			})
		}
		// object.material = m
		object.children.forEach(this.enhance)
		return object
	}
}
