import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            rememberMe: false,
            token: "",
            trending: [],
            error: null,
            isLoaded: false,

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    handleChange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value

        this.setState({
            [input.name]: value
        })
    }

    handleSubmit(event) {
        const {username, password, rememberMe, token} = this.state
        const { history } = this.props;
        
        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=e526577fc936f61b1a3711898d02e8dd', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username' : username,
                'password' : password,
                'request_token' : token
            })
        }).then((response) => response.json()
        ).then((response) => {
            if (response.success === true) {
                if (rememberMe === true) {
                    localStorage.setItem('rememberMe', rememberMe)
                    localStorage.setItem('token', rememberMe ? token : '')

                } else {
                    alert(`
                        Login successfull!
                        ${username}
                        ${password}
                        ${token}
                    `)
                }
                history.push('/')
            } else {
                console.log(`
                    ${username}
                    ${password}
                    ${token}
                    ${rememberMe}
                `)
            }
        }).catch((error) => console.log("Login error", error))
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

    requestToken() {
        fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=e526577fc936f61b1a3711898d02e8dd', 
        {
            method: "GET"
        }).then((result) => result.json()
        ).then((result) => {
            console.log(result.request_token)
            this.setState({
                isLoaded: true,
                token: result.request_token
            })
        }).catch((error) => this.setState({error, isLoaded: true}))
    }

    componentDidMount() {
        this.fetchTrending()
        this.requestToken()
    }

    usernameHandleChanges(value) {
        console.log(`Username : ${value}`)
        this.setState({
            username: value
        })
    }

    passwordHandleChanges(value) {
        console.log(`password : ${value}`)
        this.setState({
            password: value
        })
    }

    render() {
        const {trending, error} = this.state
        return (
            <React.Fragment>
                {trending.slice(0, 1).map((movie) => (
                    <div  key={movie.id} className="form-background" style={{
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
                                <form onSubmit={this.handleSubmit}>
                                    <p>Sign in</p>
                                    <p className="error">{error}</p>
                                    <div className="form-input-group">
                                        <input
                                            name="username"
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
                                            name="password"
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
                                        <div className="form-input-desc">
                                            <label htmlFor="checkbox" className="input-label">
                                                <input type="checkbox" id="checkbox" name="rememberMe" value="remember" checked={this.state.rememberMe} onChange={this.handleChange}/> Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <button 
                                        className="button-submit d-flex mx-auto" 
                                        type="submit"
                                    >
                                        <p>Sign in</p>
                                    </button>
                                    <hr/>
                                    <p className="signup">Dont't have an account? 
                                        <Link to='/register'>
                                            Sign Up
                                        </Link>
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