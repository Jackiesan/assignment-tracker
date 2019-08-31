import React from 'react'
import { Route } from 'react-router-dom'
import List from './List/List'
import AssignmentsContainer from '../assignments/Container'
import * as students from '../../api/students'

export default class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      students: [],
      loading: true
    }
    this.refreshStudents = this.refreshStudents.bind(this)

  }

  // Internal
  async refreshStudents () {
    const { response } = await students.fetchStudents()
    this.setState({ students: response })
  }

  async componentDidMount() {
    this.refreshStudents().then(() => this.setState({ loading: false }))
  }

  render () {
    const { currentUserId, isAdmin } = this.props
    const { students, loading } = this.state
    if (loading) return <span/>

    return (
      <main className='container'>
        <Route path='/students' exact component={() => <List students={students} />} />
        <AssignmentsContainer
          currentUserId={currentUserId}
          refreshStudents={this.refreshStudents}
          students={students} />
      </main>
    )
  }
}

