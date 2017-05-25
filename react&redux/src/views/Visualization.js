/**
 * Created by exialym on 2017/5/24.
 */
import React, { Component } from 'react';
import {Canvas,Graphic} from '../components/Visualization/Canvas'
import {BezierCurve,Tick,Star,Logo} from '../components/Visualization/SVG'
class Visualization extends Component {
  render() {
    return (
      <div>
        <Logo/>
        <Canvas/>
        <Graphic/>
        <BezierCurve
          startPoint={[0, 300]}
          endPoint={[400, 100]}
          controlPoints={[1,0,0,1]}
          strokeWidth={6}
        />
        <div>
          <p>This is a SVG Tick: <Tick size={16} fill="#96c7fa" /></p>
          <p>This is a SVG Star: <Star size={20} fill="#1e74e7" /></p>
        </div>
      </div>
    )
  }
}
export default Visualization;