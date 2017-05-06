/**
 * Created by exialym on 2017/5/5 0005.
 */
import React, { Component, PropTypes, cloneElement } from 'react';
import {Motion, spring} from 'react-motion';

class Animation extends Component {
  // update(done, now) {
  //   if (!this.leaveTime) {
  //     this.leaveTime = now;
  //   }
  //   const { duration } = this.props;
  //   const passedTime = now - this.enterTime;
  //   if (passedTime > duration) {
  //     if (this.cafId) {
  //       caf(this.cafId);
  //       this.leaveTime = null;
  //     }
  //     done();
  //     return;
  //   }
  //   const progress = ease(passedTime / duration);
  //   this.setState({
  //     progress,
  //   })
  //   this.cafId = raf(this.enter.bind(this, done));
  // }
  // componentWillLeave(done) {
  //   if (this.cafId) {
  //     caf(this.cafId);
  //     this.leaveTime = null;
  //   }
  //   raf(this.update.bind(this, done));
  // }

  render() {
    return (
      <Switch/>
    );
  }
}
class Switch extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      open: false,
    };
  }
  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    return (
      <Motion style={{x: spring(this.state.open ? 50 : 0)}}>
        {({x}) =>
          <div className="switch">
            <div
              className="switch-block"
              onClick={this.handleClick}
              style={{
                transform: `translate3d(${x}px, 0, 0)`,
              }}
            />
          </div>
        }
      </Motion>
    );
  }
}

export default Animation;






