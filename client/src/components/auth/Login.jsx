import React, { Component } from 'react'

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  submitLogin = e => {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(user)
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Log In</h1>
              <p className='lead text-center'>
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.submitLogin}>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control form-control-lg'
                    placeholder='Email Address'
                    name='email'
                    onChange={this.inputChange}
                    value={this.state.email}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Password'
                    value={this.state.password}
                    name='password'
                    onChange={this.inputChange}
                  />
                </div>
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
