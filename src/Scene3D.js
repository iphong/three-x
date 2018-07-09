import 'three/examples/js/controls/FlyControls'
import 'three/examples/js/controls/MapControls'
import 'three/examples/js/controls/OrbitControls'
import 'three/examples/js/controls/PointerLockControls'

import { Object3D, ParentContext } from './Object3D'

export class Scene3D extends Object3D {
	static propTypes = {
		children: PropTypes.node,
		antialias: PropTypes.bool,
		controls: PropTypes.oneOf(['fpv', 'fly', 'map', 'orbit']),
		far: PropTypes.number,
		fov: PropTypes.number,
		near: PropTypes.number,
		zoom: PropTypes.number
	}
	static defaultProps = {
		children: null,
		antialias: true,
		controls: 'orbit',
		far: 4000,
		fov: 60,
		near: 0.01,
		zoom: 1
	}
	clock = new Three.Clock()
	wrapper = React.createRef()
	scene = new Three.Scene()
	camera = new Three.PerspectiveCamera()
	renderer = new Three.WebGLRenderer({ antialias: true })
	controls = {
		// fpv: new Three.PointerLockControls(this.camera),
		// fly: new Three.FlyControls(this.camera),
		// map: new Three.MapControls(this.camera),
		orbit: new Three.OrbitControls(this.camera)
	}

	componentDidMount() {
		this.mounted = true
		// this.controls.map.enabled = false
		this.controls.orbit.enabled = false
		// this.controls.screenSpacePanning = true
		// this.controls.fly.enabled = false
		// this.controls.fpv.enabled = false
		this.wrapper.current.appendChild(this.renderer.domElement)
		this.camera.position.set(-2, 1, 7)
		// this.object.add(this.controls.fpv.getObject())
		// this.controls.fly.dragToLook = false
		// this.controls.fly.movementSpeed = 1
		// this.controls.fly.rollSpeed = 0.5
		// this.controls.map.target.set(0, 2, 0)
		this.controls.orbit.target.set(0, 1, 0)
		addEventListener('resize', this.update, true)
		this.update()
		this.animate()

		// Test objects
		new Three.TextureLoader().setPath('/ss-virtual-showroom/assets/').load('metal.jpg', texture => {
			texture.mapping = Three.SphericalReflectionMapping
			const geometry = new Three.SphereGeometry(0.5, 48, 48)
			const material = new Three.MeshLambertMaterial({
				envMap: texture
			})
			this.box = new Three.Mesh(geometry, material)
			this.box.position.set(-1.5, 0.5, 0)
			this.box.castShadow = true
			this.scene.add(this.box)
			this.update()
		})
		new Three.TextureLoader()
			.setPath('/ss-virtual-showroom/assets/')
			.load('2294472375_24a3b8ef46_o.jpg', texture => {
				texture.mapping = Three.EquirectangularReflectionMapping
				const geometry = new Three.SphereGeometry(0.5, 48, 48)
				const material = new Three.MeshPhongMaterial({
					envMap: texture,
					emissive: 0.5,
					reflectivity: 0.7
				})
				this.box = new Three.Mesh(geometry, material)
				this.box.position.set(1.5, 0.5, 0)
				this.box.castShadow = true
				this.scene.add(this.box)
				this.update()
			})
	}

	componentWillUnmount() {
		this.mounted = false
		removeEventListener('resize', this.update, true)
	}

	update = () => {
		const width = window.innerWidth
		const height = window.innerHeight
		this.camera.fov = this.props.fov
		this.camera.far = this.props.far
		this.camera.near = this.props.near
		this.camera.aspect = width / height
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(width, height)
		this.renderer.shadowMap.enabled = true
		this.renderer.antialias = this.props.antialias
		if (this.controls.current !== this.controls[this.props.controls]) {
			if (this.controls.current) {
				this.controls.current.enabled = false
			}
			this.controls.current = this.controls[this.props.controls]
			this.controls.current.enabled = true
		}
	}

	animate = () => {
		this.controls.current.update()
		this.renderer.render(this.scene, this.camera)
		if (this.mounted) {
			requestAnimationFrame(this.animate)
		}
	}
	handleClick = e => {
		// e.currentTarget.requestPointerLock()
	}

	render() {
		return (
			<ParentContext.Provider value={this.scene}>
				{this.props.children}
				<div ref={this.wrapper} onClick={this.handleClick} />
			</ParentContext.Provider>
		)
	}
}
