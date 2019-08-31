import request from './request'

export const fetchStudents = () => request('/api/users')