/**
 * Created by exialym on 2017/5/22 0022.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">Home</Link>
        {/*<Link to="/detail/1">Detail</Link>*/}
      </nav>
    );
  }
}
export default Nav;