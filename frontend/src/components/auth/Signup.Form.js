import React from 'react'
import { withRouter } from 'react-router'

class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.props.history.push('/')
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            className='form-control'
            id='email'
            onChange={this.handleChange}
            name='email'
            type='text'
            value={this.state.email} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            className='form-control'
            id='password'
            onChange={this.handleChange}
            name='password'
            type='password'
            value={this.state.password} />
        </div>
        <div className='form-group'>
          <label htmlFor='first_name'>First Name</label>
          <input
            className='form-control'
            id='first_name'
            onChange={this.handleChange}
            name='first_name'
            type='first_name'
            value={this.state.first_name} />
        </div>
        <div className='form-group'>
          <label htmlFor='last_name'>First Name</label>
          <input
            className='form-control'
            id='last_name'
            onChange={this.handleChange}
            name='last_name'
            type='last_name'
            value={this.state.last_name} />
        </div>
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(SignupForm)