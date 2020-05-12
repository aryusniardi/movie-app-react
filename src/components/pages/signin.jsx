import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

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
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              className="image-masthead"
            />
          ))}
          <header className="masthead vertical-center">
            <Container>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form className="form-box p-5">
                    <h1 className="text-center font-weight-bold">
                      Sign In
                    </h1>
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
                  </Form>
                </Col>
              </Row>
            </Container>
          </header>
        </React.Fragment>
      );
    }
  }
}
