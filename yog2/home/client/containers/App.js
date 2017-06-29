/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import { Link } from 'react-router'

class App extends Component {
  componentDidMount() {
    const { todos, actions } = this.props

    if (todos.length===0) {
      actions.getTodos()
    }
  }
  render() {
    const { todos, actions } = this.props
    console.log(todos)
    return (
      <div className="todoapp">
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        <Link className='top-nav' to={'/about'}>About</Link>
      </div>
    )
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)