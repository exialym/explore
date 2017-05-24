/**
 * Created by exialym on 2017/5/24 0024.
 */
export default class Provider extends Component {
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    const { children } = this.props
    return Children.only(children)
  }
}