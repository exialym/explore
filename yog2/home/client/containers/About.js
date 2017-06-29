/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class About extends Component {
  render() {
    return (
      <h1>Hello, I'm Exialym</h1>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)