import React from 'react'

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/Login.Form'
import Signup from './auth/Signup.Form'
import UsersContainer from './users/Container'
import * as token from '../helpers/local-storage'
import * as auth from '../api/auth'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUserId: null,
      loading: true,
      isAdmin: false
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  async componentDidMount () {
    if (token.getToken()) {
      const { user } = await auth.profile();
      this.setState({ currentUserId: user._id, loading: false, isAdmin: user.admin });
    } else {
      this.setState({ loading: false })
    }
  }

  async loginUser (user) {
    const response = await auth.login(user)
    await token.setToken(response)

    const profile = await auth.profile()
    this.setState({ currentUserId: profile.user._id, isAdmin: profile.user.admin })
  }

  async signupUser (user) {
    await auth.signup(user)
    const profile = await auth.profile()

    this.setState({ currentUserId: profile.user._id, isAdmin: profile.user.admin })
  }

  logoutUser () {
    window.localStorage.removeItem('tracker-app')
    this.setState({ currentUserId: null, isAdmin: false })
  }

  render () {
    if (this.state.loading) return <p>Loading...</p>
    const { isAdmin } = this.state
    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={this.state.currentUserId}
          logoutUser={this.logoutUser}
          isAdmin={isAdmin}
          />
        <Switch>
          <Route path='/login' exact component={() => {
            return this.state.currentUserId ?  <Redirect to='/assignments' /> : <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return this.state.currentUserId ? <Redirect to='/assignments' /> : <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return this.state.currentUserId ?
              <UsersContainer
                isAdmin={isAdmin}
                currentUserId={this.state.currentUserId}
              /> : <Redirect to='/login' />
          }} />

          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }
}

export default App