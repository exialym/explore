/**
 * Created by exialym on 2017/5/24 0024.
 */
import React, { Component } from 'react';
import Animation from "../modules/Animation/animation";
import HighOrder from "../modules/HeighOrder/highorder";
import App from "../modules/Tab/app";
import Forms from "../modules/Form/form";

class ReactTest extends Component {
  render() {
    return (
      <div>
        <h1>ReactTest</h1>
        <Animation>
          <div>123456</div>
          <div>123456</div><div>123456</div>
          <div>123456</div>
        </Animation>
        <HighOrder/>
        <App/>
        <Forms/>
      </div>
    );
  }
}
export default ReactTest;