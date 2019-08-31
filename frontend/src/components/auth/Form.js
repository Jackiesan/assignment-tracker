import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email_address_address: '',
      password: ''
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
    this.props.history.push('/assignments')
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email_address'>Email</label>
          <input
            className='form-control'
            id='email_address'
            onChange={this.handleChange}
            name='email_address'
            type='text'
            value={this.state.email_address} />
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
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default withRouter(Form)