const path = require('path')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devtool: 'source-map',

	output: {
		filename: 'bundle.umd.js',
		library: 'ThreeX',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, './lib')
	},
	resolve: {
		modules: [path.resolve(__dirname, './src'), path.resolve(__dirname, './node_modules')]
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			PropTypes: 'prop-types',
			Three: 'three'
		})
	],
	externals: {
		'three/examples/js/controls/FlyControls': 'three/examples/js/controls/FlyControls',
		'three/examples/js/controls/MapControls': 'three/examples/js/controls/MapControls',
		'three/examples/js/controls/OrbitControls': 'three/examples/js/controls/OrbitControls',
		'three/examples/js/controls/PointerLockControls': 'three/examples/js/controls/PointerLockControls',
		'three/src/helpers/GridHelper': 'three/src/helpers/GridHelper',
		'three/examples/js/loaders/OBJLoader': 'three/examples/js/loaders/OBJLoader',
		'three/examples/js/loaders/MTLLoader': 'three/examples/js/loaders/MTLLoader',
		'three/examples/js/objects/Sky': 'three/examples/js/objects/Sky',
		three: {
			commonjs: 'three',
			commonjs2: 'three',
			amd: 'three',
			root: 'THREE'
		},
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React'
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom',
			root: 'ReactDOM'
		},
		'prop-types': {
			commonjs: 'prop-types',
			commonjs2: 'prop-types',
			amd: 'prop-types'
		},
		'styled-components': {
			commonjs: 'styled-components',
			commonjs2: 'styled-components',
			amd: 'styled-components'
		}
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, loader: ['babel-loader?cacheDirectory'] },
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	}
}
