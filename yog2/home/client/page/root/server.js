/**
 * Created by exialym on 2017/6/24.
 */
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import App from '../../containers/App'
import configureStore from '../../store/configureStore'
import { RouterContext } from 'react-router'
import '../../static/css/index.css'
import { Layout, Header , Sidebar, Section, Footer } from 'fit-layout-global'
import Nav from "../../components/Nav";

export default function (state, renderProps) {
  const store = configureStore(state)
  return renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  )
}