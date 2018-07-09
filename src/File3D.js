import 'three/examples/js/loaders/OBJLoader'
import 'three/examples/js/loaders/MTLLoader'

import { Object3D } from './Object3D'

export class File3D extends Object3D {
	objLoader = new Three.OBJLoader()
	matLoader = new Three.MTLLoader()
	componentDidMount() {
		this.matLoader.setPath('/ss-virtual-showroom/assets/').load(this.props.mtl, material => {
			material.preload()
			this.objLoader
				.setMaterials(material)
				.setPath(' http://localhost:63342/ss-virtual-showroom/assets/')
				.load(this.props.obj, object => {
					this.object = this.enhance(object)
					if (this.parent) this.parent.add(this.object)
				})
		})
	}
	enhance = object => {
		object.castShadow = true
		object.receiveShadow = true
		object.children.forEach(this.enhance)
		return object
	}
}
