import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './Tab/App'


render(
  <App />,
  document.getElementById('root'),
  function () {
    console.log("tab done");
  }
)
