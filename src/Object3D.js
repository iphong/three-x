export const ParentContext = React.createContext(null)

export class Object3D extends React.Component {
	static propTypes = {
		children: PropTypes.node
	}
	static defaultProps = {
		children: null
	}
	static contextTypes = {
		scene: PropTypes.instanceOf(React.Component),
		parent: PropTypes.instanceOf(React.Component)
	}
	static childContextTypes = {
		scene: PropTypes.instanceOf(React.Component),
		parent: PropTypes.instanceOf(React.Component)
	}
	getChildContext() {
		return {
			parent: this
		}
	}
	get parent() {
		return this.context.parent
	}
	get scene() {
		return this.context.scene
	}
	componentDidMount() {
		if (this.object && this.parent) {
			this.parent.object.add(this.object)
		}
		this.update()
	}
	componentDidUpdate() {
		this.update()
	}
	componentWillUnmount() {
		if (this.object && this.parent) {
			this.parent.object.remove(this.object)
		}
	}
	update() {}
	render() {
		return this.props.children
	}
}
