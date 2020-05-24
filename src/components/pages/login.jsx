import React, {Component} from 'react'
import {useHistory, Link} from 'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
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

    getUser(username, password, token) {
        const history = useHistory()

        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=e526577fc936f61b1a3711898d02e8dd', 
        {
            method: "POST",
            body: JSON.stringify({
                'email': `${username}`,
                'password': `${password}`, 
                'request_token': `${token}`
            })
        }).then((response) => {
            if (response.success === true) {
                history.push('/')
            } else {
                this.setState({
                    error: response.success
                })
            }
        }).catch((error) => {
            this.setState({
                error: error.message
            })
        })
    }

    componentDidMount() {
        this.fetchTrending()
        this.requestToken()
    }

    updateUsername(value) {
        console.log(`Username : ${value}`)
        this.setState({
            username: value
        })
    }

    updatePassword(value) {
        console.log(`password : ${value}`)
        this.setState({
            password: value
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
        const {username, password, token, trending, error} = this.state
        console.log(token)
        return (
            <React.Fragment>
                {trending.slice(0, 1).map((movie) => (
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
                                    <p>Sign in</p>
                                    <p className="error">{error}</p>
                                    <div className="form-input-group">
                                        <input
                                            onChange={(event) => {
                                                this.updateUsername(event.target.value)
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
                                                this.updatePassword(event.target.value)
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
                                        <div className="form-input-desc">
                                            <label for="checkbox" className="input-label">
                                                <input type="checkbox" id="checkbox" name="checkbox1" value="remember" /> Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <button 
                                        className="button-submit d-flex mx-auto" 
                                        onClick={() => {
                                            this.submit(username, password, token)
                                        }}
                                    >
                                        <p>Sign in</p>
                                    </button>
                                    <hr/>
                                    <p className="signup">Dont't have an account? 
                                        <Link>
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