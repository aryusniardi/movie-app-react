import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            error: null,
            isLoaded: false,
            token: "",

        }
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
        })
    }

    getUser(email, password, request_token) {
        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=e526577fc936f61b1a3711898d02e8dd',
        {
            method: "POST",
            body: JSON.stringify({
                username: email,
                password: password,
                request_token: request_token 
            })
        }).catch((result) => result.json()
        ).catch((result) => {
            if (result.success === true || result.success === "true") {
                var mainScreen= []
                mainScreen.push('/')
            } 
            console.log(result.success)
        })
    }

    componentDidMount() {
        this.requestToken()
        this.getUser()
    }

    updateEmail(value) {
        this.setState({
            email: value
        })
    }

    updatePassword(value) {
        this.setState({
            password: value
        })
    }

    submit(email, password, token) {
        token = this.requestToken()
        if (email.length === 0) {
            this.setState({
                error: 'Email required'
            })
        } else if (password.length === 0) {
            this.setState({
                error: 'Password required'
            })
        } else if (password.length <= 6) {
            this.setState({
                error: 'Password had to be more than 6 characters'
            })
        } else {
            this.getUser(email, password, token)
            console.log (
                `email : ${email}
                password: ${password}`
            )
        }
    }

    render() {
        const {email, password, error} = this.state
        return (
            <React.Fragment>
                <div className="form-section">
                    <form className="login-form">
                        <h1>Welcome Back</h1>
                        <p>Sign in to continue</p>
                        <p className="error">{error}</p>
                        <div className="form-input-group">
                            <label for="email" className="input-label">Username</label>
                            <input 
                                onChange={(event) => {
                                    this.updateEmail(event.target.value)
                                }}
                                value={this.state.email}
                                type="email" 
                                id="email" 
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-input-group">
                            <label for="password" className="input-label">Password</label>
                            <input 
                                onChange={(event) => {
                                    this.updatePassword(event.target.value)
                                }}
                                value={this.state.password}
                                type="password" 
                                id="password" 
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-input-desc">
                            <label for="checkbox" className="input-label">
                                <input type="checkbox" id="checkbox" name="checkbox1" value="remember"/> Remember me
                            </label>
                        </div>
                        <button 
                            className="button-submit d-flex mx-auto" 
                            onClick={() => {
                                this.submit(email, password)
                            }}
                        >
                            <p>Login</p>
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}