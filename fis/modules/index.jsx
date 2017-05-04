import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './Tab/App'
import Forms from "./Form/form";
import HighOrder from './HeighOrder/highorder'


render(
  <div>
    <App/>
    <Forms/>
    <HighOrder/>
  </div>,
  document.getElementById('root'),
  function () {
    console.log("tab done");
  }
)
