/**
 * Created by exialym on 2017/5/24.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
var ReactCanvas = require('react-canvas');
var imgUrl = require('../../../build/enzo.jpg');

var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;

export class Canvas extends Component {
  render () {
    var surfaceWidth = window.innerWidth;
    var surfaceHeight = window.innerHeight;
    var imageStyle = this.getImageStyle();
    var textStyle = this.getTextStyle();

    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Image style={imageStyle} src={imgUrl} />
        <Text style={textStyle}>
          Here is some text below an image. Printed by canvas.
        </Text>
      </Surface>
    );
  }

  getImageHeight () {
    return Math.round(window.innerHeight / 2);
  }

  getImageStyle () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: this.getImageHeight()
    };
  }

  getTextStyle () {
    return {
      top: this.getImageHeight() + 10,
      left: 0,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }
}
export class Graphic extends Component {
  static propTypes = {
    rotation: PropTypes.number,
    color: PropTypes.string,
  };
  static defaultProps = {
    rotation: 0,
    color: 'green',
  };
  componentDidMount() {
    const context = findDOMNode(this).getContext('2d');
    this.paint(context);
  }
  componentDidUpdate() {
    const context = findDOMNode(this).getContext('2d');
    context.clearRect(0, 0, 200, 200);
    this.paint(context);
  }
  paint(context) {
    context.save();
    context.translate(100, 100);
    context.rotate(this.props.rotation, 100, 100);
    context.fillStyle = this.props.color;
    context.fillRect(-50, -50, 100, 100);
    context.restore();
  }
  render() {
    return <canvas width={200} height={200} />;
  }
}



