/**
 * Created by exialym on 2017/5/25 0025.
 */
import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
const getPath = (start, end, controlPoints) => {
  const [fx, fy, sx, sy] = controlPoints;
  const controlPoint01 = [start[0] + fx * (end[0] - start[0]), start[1] +
  fy * (end[1] - start[1])];
  const controlPoint02 = [start[0] + sx * (end[0] - start[0]), start[1] +
  sy * (end[1] - start[1])];
  return `M${start}C${controlPoint01} ${controlPoint02} ${end}`;
};
export const BezierCurve = (props) => {
  const { width, height, startPoint, endPoint, controlPoints, ...others }
    = props;
  return (
    <svg width={width} height={height}>
      <path
        d={getPath(startPoint, endPoint, controlPoints)}
        fill="none"
        stroke="black"
        strokeWidth="2"
        {...others}
      />
    </svg>
  );
};
BezierCurve.defaultProps = {
  width: 400,
  height: 400,
  controlPoints: [1/3, 0, 2/3, 1],
};
BezierCurve.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  startPoint: PropTypes.arrayOf(PropTypes.number),
  endPoint: PropTypes.arrayOf(PropTypes.number),
  controlPoints: PropTypes.arrayOf(PropTypes.number),
};


export const Star = ({ size = 12, fill = '#666', x = 0, y = 0 }) => {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 1024 1024"
         fill={fill}>
      <path d="M1002.656 401.856l-339.04-49.28-151.616-307.232-151.616 307.232-339.04 49.28 245.344 239.136-57.92 337.664 303.264-159.424 303.264 159.424-57.92-337.664 245.344-239.136zM512 760.544l-230.72 123.424 44.064-261.408-186.656-185.152 257.952-38.144 115.36-237.856 115.36 237.856 257.952 38.144-186.656 185.152 44.064 261.408-230.72-123.424z" />
    </svg>
  );
};
export const Tick = ({ size = 12, fill = '#666', x = 0, y = 0 }) => {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 1024 1024"
         fill={fill}>
      <path d="M980.96 299.904l-528.864 528.864c-24.384 24.384-61.536 28.192-89.952 11.392-5.216-3.104-10.208-6.912-14.72-11.392 0-0.032 0-0.032 0-0.032l-304.448-304.416c-28.896-28.896-28.896-75.808 0-104.704s75.744-28.896 104.672 0l252.192 252.192 476.48-476.576c28.896-28.896 75.744-28.896 104.64 0 28.928 28.896 28.928 75.808 0 104.672l0 0z" />
    </svg>
  );
};
export const Logo = () => {
  return (
    <div>
      <CSSTransitionGroup transitionName="logo" component="div" transitionAppearTimeout={4000}
                          transitionAppear={true} transitionEnter={false} transitionLeave={false}>
        <svg height="300" viewBox="0 0 404.7 354" key="svg">
          <path id="hi-path" fill="none" stroke="#000" d="M324.6,61.2c16.6,0,29.5-12.9,29.5-29.5c0-16.6-12.9-29.5-29.5-29.5c-16.6,0-29.5,12.9-29.5,29.5C295.1,48.4,308,61.2,324.6,61.2zM366.2,204.2c-9.8,0-15-5.6-15-15.1V77.2h-85v28h19.5c9.8,0,8.5,2.1,8.5,11.6v72.4c0,9.5,0.5,15.1-9.3,15.1H277h-20.7c-8.5,0-14.2-4.1-14.2-12.9V52.4c0-8.5,5.7-12.3,14.2-12.3h18.8v-28h-127v28h18.1c8.5,0,9.9,2.1,9.9,8.9v56.1h-75V53.4c0-11.5,8.6-13.3,17-13.3h11v-28H2.2v28h26c8.5,0,12,2.1,12,7.9v142.2c0,8.5-3.6,13.9-12,13.9h-21v33h122v-33h-11c-8.5,0-17-4.1-17-12.2v-57.8h75v58.4c0,9.1-1.4,11.6-9.9,11.6h-18.1v33h122.9h5.9h102.2v-33H366.2z" />
        </svg>
      </CSSTransitionGroup>
    </div>
  );
};