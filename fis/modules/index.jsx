import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './Tab/App'
import Forms from "./Form/app";


render(
  <div>
    <App/>
    <Forms/>
  </div>,
  document.getElementById('root'),
  function () {
    console.log("tab done");
  }
)
