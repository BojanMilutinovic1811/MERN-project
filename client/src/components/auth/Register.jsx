import React, { Component } from 'react'

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }

  inputChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  submitForm = e => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    console.log(newUser)
  }

  render () {
    return (
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>
                Create your DevConnector account
              </p>
              <form onSubmit={this.submitForm}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Name'
                    name='name'
                    onChange={this.inputChange}
                    value={this.state.name}
                    required
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control form-control-lg'
                    placeholder='Email Address'
                    name='email'
                    value={this.state.email}
                    onChange={this.inputChange}
                  />
                  <small className='form-text text-muted'>
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.inputChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control form-control-lg'
                    placeholder='Confirm Password'
                    name='password2'
                    value={this.state.password2}
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
