/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'


import { Layout, Sidebar, Section } from 'fit-layout-global'

export default class About extends Component {
  render() {
    return (
      <h1>hello</h1>
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