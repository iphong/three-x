import { Object3D } from 'Object3D'

import 'three/examples/js/objects/Sky'

export class Sky3D extends Object3D {
	static propTypes = {
		...Object3D.propTypes,
		azimuth: PropTypes.number,
		inclination: PropTypes.number,
		rayleigh: PropTypes.number,
		turbidity: PropTypes.number,
		luminance: PropTypes.number,
		mieCoefficient: PropTypes.number,
		mieDirectionalG: PropTypes.number
	}

	static defaultProps = {
		...Object3D.defaultProps,
		azimuth: 0.28,
		inclination: -0.15,
		rayleigh: 2,
		turbidity: 10,
		luminance: 1,
		mieCoefficient: 0.003,
		mieDirectionalG: 0.8
	}
	sky = new Three.Sky()
	light = new Three.DirectionalLight()
	ambient = new Three.HemisphereLight()
	object = Object.assign(new Three.Group(), { children: [this.sky, this.light, this.ambient] })

	update() {
		const { sky, light, ambient } = this
		const distance = 100

		const { inclination, azimuth, turbidity, rayleigh, luminance, mieCoefficient, mieDirectionalG } = this.props

		const theta = Math.PI * (inclination - 0.5)
		const phi = 2 * Math.PI * (azimuth - 0.5)
		const sunX = distance * Math.cos(phi)
		const sunY = distance * Math.sin(phi) * Math.sin(theta)
		const sunZ = distance * Math.sin(phi) * Math.cos(theta)

		sky.scale.setScalar(400000)

		sky.material.uniforms.turbidity.value = turbidity
		sky.material.uniforms.rayleigh.value = rayleigh
		sky.material.uniforms.luminance.value = luminance
		sky.material.uniforms.mieCoefficient.value = mieCoefficient
		sky.material.uniforms.mieDirectionalG.value = mieDirectionalG
		sky.material.uniforms.sunPosition.value.set(sunX, sunY, sunZ)

		light.castShadow = true
		light.position.copy(sky.material.uniforms.sunPosition.value)
		light.intensity = 1
		light.color.setHSL(0.1, 1, 0.95)
		light.shadow.mapSize.width = 4096
		light.shadow.mapSize.height = 4096

		ambient.intensity = 0.6
		ambient.color.setHSL(0.6, 1, 0.6)
		ambient.groundColor.setHSL(0.095, 1, 0.75)
		ambient.position.set(0, 50, 0)
	}
}
