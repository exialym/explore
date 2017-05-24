import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './Tab/App'
import Forms from "./Form/form";
import HighOrder from './HeighOrder/highorder'
import Animation from './Animation/animation'


render(
  <div>
    <App/>
    <Forms/>
    <HighOrder/>
    <Animation>
      <div>123456</div>
      <div>123456</div><div>123456</div>
      <div>123456</div>

    </Animation>
  </div>,
  document.getElementById('root'),
  function () {
    console.log("tab done");
  }
)
