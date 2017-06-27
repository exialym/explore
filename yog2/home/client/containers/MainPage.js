/**
 * Created by exialym on 2017/6/26.
 */
import * as React from 'react'
import { Component, PropTypes } from 'react'
import { Layout, Header , Sidebar, Section, Footer } from 'fit-layout-global'
import Nav from "../components/Nav";

export default class MainPage extends Component {
  render() {
    return (
      <Layout>
        <Header height={50}>
          <Nav/>
        </Header>
        <Sidebar width={100} direction="right">侧边栏</Sidebar>
        <Section>
          {this.props.children}
        </Section>
      </Layout>
    )
  }
}