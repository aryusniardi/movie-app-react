import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Register extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === 'checkbox' ? input.checked : input.value

    this.setState({
      [input.name]: value
    })
  }

  handleSubmit(event) {
    const {firstName, lastName, username, password, confirmation} = this.state
    const {history} = this.props

    if ( firstName.length && lastName.length && username.length && password.length && confirmation.length > 0) {
      if (password.length > 5) {
        if (password === confirmation) {
          alert("Registration successfull !")
          history.push('/login')
        } else {
          this.setState({
            error: "Password doesn't match..."
          })
        }
      } else {
        this.setState({
          error: 'Password minimum 6 characters'
        })
      }
    }

    event.preventDefault()
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

  render() {
    const { trending, error } = this.state
    return (
      <React.Fragment>
        {trending.slice(13, 14).map((movie) => (
          <div key={movie.id} className="form-background" style={{
              background: `
              linear-gradient(to top,
              rgba(15, 15, 15, 0) 0%,
              rgba(15, 15, 15, .5) 20%,
              rgba(15, 15, 15, .5) 50%,
              rgba(15, 15, 15, .5) 75%,
              rgba(15, 15, 15, 1) 100%),
              url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
          `}}>
            <div className="form-section">
              <div className="login-form">
                <form onSubmit={this.handleSubmit}>
                  <p>Register</p>
                  <p className="error">{error}</p>
                  <div className="form-input-flex">
                    <input
                      onChange={this.handleChange}
                      value={this.state.firstName}
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="form-input"
                      required
                    />

                    <input
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                    type="submit"
                  >
                    <p>Sign up</p>
                  </button>
                  <hr />
                  <p className="signup">Already have an account ?
                    <Link to='/login'> Sign In </Link>
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

const mapStateToProps = (response) => ({
  response
})

export default connect(mapStateToProps)(Register)