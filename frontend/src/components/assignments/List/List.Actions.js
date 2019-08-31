
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

 export default ({ destroyAssignment, assignment, student }) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    <Link className='btn btn-link' to={`/students/${student._id}/assignments/${assignment._id}/edit`}>Edit Post</Link>

    <button
      className='btn btn-link text-danger'
      onClick={() => destroyAssignment(student, assignment)}>
      Delete Assignment
        </button>
    <span className='btn btn-link text-muted' disabled>Created {moment(assignment.created_at).fromNow()}</span>
  </div>
)