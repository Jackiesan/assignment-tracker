import React from 'react'

import Actions from './List.Actions'

export default ({ destroyAssignment, user }) => {
  const assignments = user.assignments.map(assignment => (
    <div key={assignment._id} className='card'>
      <div className='card-body'>
        <p className='card-text'>{ assignment.content }</p>
        <blockquote className='blockquote mb-0'>
          <footer className='blockquote-footer'>Was feeling: { assignment.title }</footer>
        </blockquote>
      </div>
      <Actions destroyPost={destroyAssignment} post={assignment} user={user} />
    </div>
  ))

  return (
    <>
      <h1 className='mb-4'>{ user.email_address }'s Assignments</h1>
      { assignments }
    </>
  )
}
