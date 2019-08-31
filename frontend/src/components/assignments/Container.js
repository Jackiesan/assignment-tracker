import React from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'

// Helpers
import * as assignments from '../../api/assignments'
import * as students from '../../api/students'

// Components
import List from './List/List'
import EditForm from './Form/Edit.Form'
import NewForm from './Form/New.Form'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.createAssignment = this.createAssignment.bind(this)
    this.destroyAssignment = this.destroyAssignment.bind(this)
    this.editAssignment = this.editAssignment.bind(this)
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

  async createAssignment (assignment) {
    const { currentUserId, history, refreshStudents } = this.props

    await assignments.createAssignment({ user: { _id: currentUserId }, assignment })
    await refreshStudents()

    history.push(`/students/${currentUserId}/assignments`)
  }

  async destroyAssignment (assignment) {
    const { currentUserId, history, refreshStudents } = this.props

    await assignments.destroyAssignment({ user: { _id: currentUserId }, assignment })
    await refreshStudents()

    history.push(`/students/${currentUserId}/assignments`)
  }

  async editAssignment (assignment) {
    const { currentUserId, history, refreshStudents } = this.props

    await assignments.updateAssignment({ user: { _id: currentUserId }, assignment })
    await refreshStudents()

    history.push(`/students/${currentUserId}/assignments`)
  }

  render () {
    const { currentUserId } = this.props
    const { students, loading } = this.state
    return (
      <>
        <Route path='/assignments' exact component={() => {
          const student = students.find(student => student._id === currentUserId)

          if (loading) return <span/>

          return (
            <List
              currentUserId={currentUserId}
              destroyAssignment={this.destroyAssignment}
              student={student} />
          )
        }} />
        <Route path='/students/:studentId/assignments/new' exact component={() => {
          return <NewForm onSubmit={this.createAssignment} />
        }} />
        <Route path='/students/:studentId/assignments/:assignmentId/edit' exact component={({ match }) => {
          console.log('here')
          const student = students.find(user => user._id === match.params.userId)
          const assignment = student.assignments.find(student => student._id === match.params.assignmentId)
          return <EditForm onSubmit={this.editAssignment} assignment={assignment} />
        }} />
      </>
    )
  }
}

export default withRouter(Container)