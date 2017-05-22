/**
 * Created by exialym on 2017/5/22 0022.
 */
import React, { Component } from 'react';
import Nav from './Nav';
class Frames extends Component {
  render() {
    return (
      <div className="frame">
        <section className="header">
          <Nav />
        </section>
        <section className="container">
          {this.props.children}
        </section>
      </div>
    );
  }
}
export default Frames;