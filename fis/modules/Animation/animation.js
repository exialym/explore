/**
 * Created by exialym on 2017/5/5 0005.
 */
import React, { Component, PropTypes, cloneElement } from 'react';
//import AnimateGroup from 'react-smooth';


const appear = {
  from: 0,
  to: 1,
  attributeName: 'opacity',
};

const leave = {
  steps: [{
    style: {
      transform: 'translateX(0)',
    },
  }, {
    duration: 1000,
    style: {
      transform: 'translateX(300)',
      height: 50,
    },
  }, {
    duration: 2000,
    style: {
      height: 0,
    },
  }]
};
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
      <div></div>
    );
  }
}
{/*<AnimateGroup appear={appear} leave={leave}>*/}
  {/*{ this.props.children }*/}
{/*</AnimateGroup>*/}
export default Animation;






