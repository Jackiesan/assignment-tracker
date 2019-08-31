
import request from './request'
const { NODE_ENV } = process.env
const BASE_URL = NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : 'tbd' // Once we deploy, we need to change this

export const createAssignment = ({ user, assignment }) => {
  const path = `/api/users/${user._id}/assignments`
  const options = { body: assignment, method: 'POST' }
  return request(path, options)
}

export const destroyAssignment = ({ user, assignment }) => {
  const path = `/api/users/${user._id}/assignments/${assignment._id}`
  const options = { method: 'DELETE' }
  return request(path, options)
}

export const updateAssignment = ({ user, assignment }) => {
  const path = `/api/users/${user._id}/assignments/${assignment._id}`
  const options = { body: assignment, method: 'PUT' }
  return request(path, options)
}

export const fetchAssignments = async ({ user }) => {
  const token = window.localStorage.getItem('tracker-app')
  const response = await fetch(`${BASE_URL}/api/users/${user._id}/assignments`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  const json = await response.json()
  return json
}