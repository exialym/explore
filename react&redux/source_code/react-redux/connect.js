/**
 * Created by exialym on 2017/5/24 0024.
 */
import hoistStatics from 'hoist-non-react-statics'
let nextVersion = 0
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  const shouldSubscribe = Boolean(mapStateToProps)
  //为是否需要热更新提供依据
  const version = nextVersion++
  //mapDispatchToProps与mapStateToProps思路基本一致，只不过它接收的参数是dispatch和props

  //mergeProps接收3个参数stateProps，dispatchProps，֖ownProps。前两个参数分别是mapStateToProps和mapDispatchToProps的返回值
  // owmProps是组件自己的props，这个方法是为了方便整理这些不同来源的props，不常用

  //options有两个属性，pure，withRef
  //pure为true则会为组件定义shouldComponentUpdate，比较前后两个prop是否变化，减少不必要的更新
  //withRef为true则Connect组件会 保留原始 组件的refs引用，通过getWrappedInstance可以获得被包裹的组件，进而通过获取组件的refs获取组件的原始dom

// ...
  //connect返回的这个函数接收我们要与Redux连接的组件，并利用传入connect的参数，将组件在Connect组件的render中渲染
  return function wrapWithConnect(WrappedComponent) {
// ...
    const mapState = mapStateToProps || defaultMapStateToProps
    class Connect extends Component {
// ...
      constructor(props, context) {
// ...
        super(props, context);
        this.version = version;
      }
      computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props)
        }
        const state = store.getState()
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state)
        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps')
        }
        return stateProps
      }
      configureFinalMapState(store, props) {
        //将完整的state和props传给传进connect的第一个参数mapStateToProps，mapStateToProps可以返回对象或函数
        //如果是函数，那就进到computeStateProps中，使用这个函数来计算最后的mappedState
        //如果是对象，就直接使用这个对象作为mappedState
        const mappedState = mapState(store.getState(), props)
        const isFactory = typeof mappedState === 'function'
        this.finalMapStateToProps = isFactory ? mappedState : mapState
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1
        if (isFactory) {
          return this.computeStateProps(store, props)
        }
        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps')
        }
        return mappedState
      }
      trySubscribe() {
        //如果存在mapStateToProps，那就意味着组件与Redux的State是有关联的，所以订阅store的更新事件。
        if (shouldSubscribe && !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
          this.handleChange()
        }
      }
      render() {
// ...
        if (withRef) {
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }
        return this.renderedElement
      }
    }
    //热替换支持，当处在开发环境下时，Connect组件有一个componentWillUpdate方法，检测当前组件version是否与全局的不同
    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return
        }
        this.version = version
        this.trySubscribe()
        this.clearCache()
      }
    }
// ...
    return hoistStatcis(Connect, WrappedComponent);
  }
}