import React, { Component } from 'react'
import { useHistory, Link } from 'react-router-dom'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmation: "",
      error: null,
      isLoaded: false,
      token: "",
      trending: []

    }
  }

  fetchTrending() {
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=e526577fc936f61b1a3711898d02e8dd',
    ).then((result) => result.json()
    ).then((result) => {
      console.log(result)
      this.setState({
        trending: result.results,
        isLoaded: true
      })
    })
  }

  componentDidMount() {
    this.fetchTrending()
  }

  firstNameHandleChanges(value) {
    this.setState({
      firstName: value
    })
  }

  lastNameHandleChanges(value) {
    this.setState({
      lastName: value
    })
  }

  usernameHandleChanges(value) {
    this.setState({
      username: value
    })
  }

  passwordhandleChanges(value) {
    this.setState({
      password: value
    })
  }

  confirmationHandleChanges(value) {
    this.setState({
      confirmation: value
    })
  }

  submit(username, password, token) {
    if (username.length === 0) {
      this.setState({
        error: 'Email required'
      })
    } else if (password.length === 0) {
      this.setState({
        error: 'Password required'
      })
    } else {
      this.getUser(username, password, token)
      if (this.getUser(username, password, token === true)) {
        this.props.push('/')
      }
    }
  }

  render() {
    const { firstName, lastName, username, password, confirmation, token, trending, error } = this.state
    console.log(token)
    return (
      <React.Fragment>
        {trending.slice(18, 19).map((movie) => (
          <div className="form-background" style={{
              background: `
              linear-gradient(to top,
              rgba(15, 15, 15, 1) 0%,
              rgba(15, 15, 15, .5) 20%,
              rgba(15, 15, 15, .5) 50%,
              rgba(15, 15, 15, .5) 75%,
              rgba(15, 15, 15, 1) 100%),
              url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
          `}}>
            <div className="form-section">
              <div className="login-form">
                <form>
                  <p>Register</p>
                  <p className="error">{error}</p>
                  <div className="form-input-flex">
                    <input
                      onChange={(event) => {
                        this.firstNameHandleChanges(event.target.value)
                      }}
                      value={this.state.firstName}
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="form-input"
                      required
                    />

                    <input
                      onChange={(event) => {
                        this.lastNameHandleChanges(event.target.value)
                      }}
                      value={this.state.lastName}
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className="form-input"
                      required
                    />  
                  </div>
                  <div className="form-input-group">
                    <input
                      onChange={(event) => {
                        this.usernameHandleChanges(event.target.value)
                      }}
                      value={this.state.username}
                      type="text"
                      id="username"
                      placeholder="Username"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-input-group">
                    <input
                      onChange={(event) => {
                        this.passwordhandleChanges(event.target.value)
                      }}
                      value={this.state.password}
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-input-group">
                    <input
                      onChange={(event) => {
                        this.confirmationHandleChanges(event.target.value)
                      }}
                      value={this.state.confirmation}
                      type="password"
                      id="confimation-password"
                      placeholder="Confirm Password"
                      className="form-input"
                      required
                    />
                  </div>
                  <button
                    className="button-submit d-flex mx-auto"
                    onClick={() => {
                      this.submit(username, password, token)
                    }}
                  >
                    <p>Sign in</p>
                  </button>
                  <hr />
                  <p className="signup">Already have an account ?
                    <Link> Sign In </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    )
  }
}