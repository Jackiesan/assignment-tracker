import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const AuthenticatedLinks = ({ currentUserId, logoutUser, history }) => {
  const logout = () => {
    logoutUser()
    history.push('/login')
  }
  return (
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <Link className='nav-link' to='/students'>All Students</Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to={`/students/${currentUserId}/assignments/new`}>
          Create a New Assignment
        </Link>
      </li>
      <li className='nav-item'>
        <button
          className='btn btn-link'
          onClick={logout}>
            Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(AuthenticatedLinks)