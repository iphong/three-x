export const ParentContext = React.createContext(null)

export class Object3D extends React.Component {
	static propTypes = {
		children: PropTypes.node
	}
	static defaultProps = {
		children: null
	}
	componentDidMount() {
		if (this.object && this.parent) {
			this.parent.add(this.object)
		}
		this.update()
	}
	componentDidUpdate() {
		this.update()
	}
	componentWillUnmount() {
		if (this.object && this.parent) {
			this.parent.remove(this.object)
		}
	}
	update() {}
	render() {
		return (
			<ParentContext.Consumer>
				{parent => {
					this.parent = parent
					return <ParentContext.Provider value={this}>{this.props.children}</ParentContext.Provider>
				}}
			</ParentContext.Consumer>
		)
	}
}
