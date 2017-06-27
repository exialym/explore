/**
 * Created by exialym on 2017/6/26.
 */
import * as React from 'react'
import { PropTypes, Component } from 'react'
import {Menu, SubMenu, MenuItem} from 'fit-menu'

class Nav extends Component {
  render() {
    return (
      <Menu>
        <MenuItem brand
                  inverse to="/">todos</MenuItem>
        <MenuItem to="/about">about</MenuItem>
      </Menu>
    )
  }
}
export default Nav