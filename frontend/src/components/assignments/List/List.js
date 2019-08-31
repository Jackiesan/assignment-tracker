import React from 'react'
import { Link } from 'react-router-dom'
import Actions from './List.Actions'

export default ({ destroyAssignment, student }) => {
  const assignments = student.assignments.map(assignment => (
    <div key={assignment._id} className='card'>
      <div className='card-body'>
        <h5 className='card-text'>{ assignment.title }</h5>
        <Link to={`${assignment.link}`}>
        Link: {assignment.link}
        </Link>
        <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'>{ assignment.description }</footer>
        </blockquote>
      </div>
      <Actions destroyAssignment={destroyAssignment} assignment={assignment} student={student} />
    </div>
  ))

  return (
    <>
      <h1 className='mb-4'>My Assignments</h1>
      { assignments }
    </>
  )
}
