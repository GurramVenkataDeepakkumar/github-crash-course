import '../modules/styles.css'
import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import { ServerRoute } from 'react-project'
import hello from './api/hello'
import App from './components/App'
import Home from './components/Home'
import NoMatch from './components/NoMatch'
import Dragon from './components/Dragon'
import Login from './components/Login'
import Register from './components/Register'

export default (
  <Route>
    <Route path="/" component={App}>
  <IndexRoute component={Home}/>
  <Route path="dragon" component={Dragon}/>
  <Route path="login" component={Login}/>
    <Route path="register" component={Register}/>
    </Route>
    <ServerRoute path="/api">
      <ServerRoute path=":hello" get={hello}/>
    </ServerRoute>
    <Redirect from="/not-dragon" to="/dragon"/>
    <Route path="*" status={404} component={NoMatch}/>
  </Route>
)
