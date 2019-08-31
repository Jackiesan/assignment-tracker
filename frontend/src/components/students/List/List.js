import React from 'react'
import { Link } from 'react-router-dom'

export default ({ students }) => {

  const calculateTotalScore = (assignments) => {
    let sum = 0
    for (let i=0; i < assignments.length; i ++) {
      if (assignments[i]['score'] !== undefined ) {
        sum += assignments[i]['score']
      }
    }
    return sum
  }

  const calculateTotalMaxScore = (assignments) => {
    let sum = 0
    for (let i=0; i < assignments.length; i ++) {
      if (assignments[i]['max_score'] !== undefined ) {
        sum += assignments[i]['max_score']
      }
    }
    return sum
  }
  const lis = students.map(student => (
    <li key={student._id}>
      <b>{student.first_name} {student.last_name}</b> -
      <span> {student.email_address} -</span>
      <span>
        <em>
          Score:
        </em>
         {calculateTotalScore(student.assignments)} / {calculateTotalMaxScore(student.assignments)}
      </span>
    </li>
  ))

  return (
    <>
      <h1>All Students</h1>
      <ul>
        { lis }
      </ul>
    </>
  )
}
