import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';



class HighOrder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Wdemo hhh="ddd"/>
        <MyInputWapped/>
      </div>
    );
  }
}

/***********************属性代理控制props和通过ref使用被包裹元素的引用****************************/
const MyContainer = (WrappedComponent) =>
  class extends Component {
    proc(wrappedComponentInstance) {
      //调用WrappedComponent实例的方法
      wrappedComponentInstance.demoMethod();
    }
    render() {
      //我们可以通过高阶组件像里面的组件传递props
      const props = Object.assign({}, this.props, {
        //这个特别的ref属性是一个函数，在WrappedComponent被渲染时，会得到一个指向WrappedComponent实例的参数
        //ref在WrappedComponent的props里并不能直接访问
        ref: this.proc.bind(this),
        newP:"newwPP"
      });
      console.log(props);
      return <WrappedComponent {...props} />;
    }
  };
class Demo extends Component {
  constructor(props) {
    super(props);
    //ref在WrappedComponent的props里并不能直接访问
    console.log(this.props);
  }
  demoMethod(){
    console.log("this is a Demo's method");
  }
  render() {
    return <div>哈哈哈</div>;
  }
}
const Wdemo = MyContainer(Demo);

/***********************属性代理抽象state****************************/
// 这是对高阶组件的一种利用，将所有状态提升到高阶组件中，被包装的组件就是一个纯展示组件
// 一定程度上可以说是逻辑与视图分离
const MyContainer1 = (WrappedComponent) =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
      this.onNameChange = this.onNameChange.bind(this);
    }
    onNameChange(event) {
      this.setState({
        name: event.target.value,
      })
    }
    componentDidMount() {
      console.log("HOC did Mount");
    }
    componentWillMount() {
      console.log("HOC will Mount");
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange,
        },
      }
      return (
        <div>
          <span>高阶组件抽象state：{this.state.name}</span>
          <WrappedComponent {...this.props} {...newProps} />
        </div>);
    }
  }
class MyInput extends Component {
  //HOC will Mount
  //Wrapped will Mount
  //Wrapped did Mount
  //HOC did Mount
  componentDidMount() {
    console.log("Wrapped did Mount");
  }
  componentWillMount() {
    console.log("Wrapped will Mount");
  }
  render() {
    return <input name="name" {...this.props.name} />;
  }
}
const MyInputWapped = MyContainer1(MyInput);

export default HighOrder;
