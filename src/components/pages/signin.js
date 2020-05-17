import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Form, Button } from "react-bootstrap";
import Instagram from '../../assets/instagram.svg';
import Facebook from '../../assets/facebook.svg';
import Twitter from '../../assets/twitter.svg';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoaded: false,
      popular: [],
      error: null,
    };
  }

  fetchPopular() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1",
      {
        method: "GET",
      }
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          popular: result.results,
        });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
  }

  componentDidMount() {
    this.fetchPopular();
  }

  updateUsername(value) {
    this.setState({
      username: value
    })
  }

  updatePassword(value) {
    this.setState({
      password: value
    })
  }

  submit(username, password) {
    console.log(username + password)
  }

  render() {
    const {
      username,
      password,
      error,
      popular,
      isLoaded,
    } = this.state;
    if (error) {
      return <div>Error : {error.mesage}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          {popular.slice(8, 9).map((movie) => (
            <>
            <header className="masthead-form-login" style={{ zIndex: `1`, backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 25%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 1) 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')` }} />
                <div className = "h-100 section-center box-login vertical-center w-100">
                  <div className=" justify-content-center mx-auto">
                    <Form className="form-box">
                      <h2 className="text-center font-weight-bold text-title text-white mx-auto">
                        Sign In
                      </h2>
                        <hr />
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Username"
                        className="input-group"
                        onChange={(event) => {
                          this.updateUsername(event.target.value)
                        }}
                        value={this.state.email}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                      <Form.Control
                        size="lg"
                        type="password"
                        placeholder="Password"
                        className="input-group"
                        onChange={(event) => {
                          this.updatePassword(event.target.value)
                        }}
                        value={this.state.password}
                      />
                    </Form.Group>
                    
                    <Button
                      variant="danger"
                      size="lg"
                      block
                      className="rounded-button mb-3"
                      onClick={() => {
                        this.submit(username, password)
                      }}
                    >
                      <b>SIGN IN</b>
                    </Button>

                    <hr />
                    <Form.Group>
                      <Form.Text className="text-white h6 text-center">
                        <Link
                          to="/register"
                          className="text-decoration-none h5"
                        >
                            Create an account
                        </Link>
                      </Form.Text>
                    </Form.Group>
                      <div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="form-border w-25"/>
                          <h5 className="mx-3 mt-2">
                            or sign in with
                          </h5>
                          <div className="form-border w-25"/>
                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-3">
                          <img
                            alt=""
                            src={Instagram}
                            height="25"
                            className="d-block img mx-5"
                            />
                          <img
                            alt=""
                            src={Twitter}
                            height="25"
                            className="d-block img mx-5"
                          />
                          <img
                            alt=""
                            src={Facebook}
                            height="25"
                            className="d-block img mx-5"
                          />

                        </div>
                      </div>
                      </Form>
                  </div>
                </div>
                </>
          ))}
        </React.Fragment>
      );
    }
  }
}
