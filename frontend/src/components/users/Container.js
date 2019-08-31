import React from 'react'
import { Route } from 'react-router-dom'
import List from './List/List'
import PostsContainer from '../assignments/Container'
import * as users from '../../api/users'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
    this.refreshUsers = this.refreshUsers.bind(this)

  }

  // Internal
  async refreshUsers () {
    const { response } = await users.fetchUsers()
    this.setState({ users: response })
  }

  async componentDidMount() {
    this.refreshUsers().then(() => this.setState({ loading: false }))
  }

  render () {
    const { currentUserId, isAdmin } = this.props
    const { users, loading } = this.state
    if (loading) return <span/>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <PostsContainer
          currentUserId={currentUserId}
          refreshUsers={this.refreshUsers}
          users={users} />
      </main>
    )
  }
}

