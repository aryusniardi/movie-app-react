import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import {Container, Row, Col, Image, Form, Button} from 'react-bootstrap';

export default class Register extends Component {  
  constructor(props) {
    super(props);

    this.state = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmation: '',
        isLoaded: false,
        popular: [],
        error: null
    }
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

  updateFirstName(value) {
    this.setState({
      first_name: value
    })
  }

  updateLastName(value) {
    this.setState({
      last_name: value
    })
  }

  updateEmail(value) {
    this.setState({
      email : value
    })
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

  updateCofirmPassword(value) {
    this.setState({
      confirmation: value
    })
  }

  componentDidMount() {
      this.fetchPopular()
  }

  render() {
      const {first_name, last_name, email, password, confirmation, error, popular, isLoaded} = this.state;
        if (error) {
          return <div>Error : {error.mesage}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          return (
            <React.Fragment>
              {popular.slice(1, 2).map((movie) => (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="image-masthead"
                />
              ))}
              <header className="masthead vertical-center">
                <Container>
                  <Row>
                    <Col md={{ span: 6, offset: 6 }}>
                      <Form className="form-box p-5">
                        <h1 className="text-center font-weight-bold">
                          Create Account
                        </h1>
                        <hr />
                        <Form.Group
                          controlId="formBasicEmail"
                          className="mb-3"
                          >
                          <Form.Control
                            size="lg"
                            type="text"
                            placeholder="First Name"
                            className="input-group"
                            onChange={(event) => {
                              this.updateFirstName(event.target.value)
                            }}
                            value={this.state.first_name}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formBasicEmail"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            type="text"
                            placeholder="Last Name"
                            className="input-group"
                            onChange={(event) => {
                              this.updateLastName(event.target.value)
                            }}
                            value={this.state.last_name}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formBasicEmail"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            type="email"
                            placeholder="Email Address"
                            className="input-group"
                            onChange={(event) => {
                              this.updateEmail(event.target.value)
                            }}
                            value={this.state.email}
                          />
                          <Form.Text className="text-white">
                            We'll never share your email with anyone else.
                          </Form.Text>
                        </Form.Group>

                        <Form.Group
                          controlId="formBasicPassword"
                          className="mb-3"
                        >
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
                        <Form.Group
                          controlId="formBasicPassword"
                          className="mb-3"
                        >
                          <Form.Control
                            size="lg"
                            type="password"
                            placeholder="Type your password again"
                            className="input-group"
                            onChange={(event) => {
                              this.updateCofirmPassword(event.target.value)
                            }}
                            value={this.state.confirmation}
                          />
                          <Form.Text className="text-white">
                            Minimum of eight characters, one letter and one
                            number
                          </Form.Text>
                        </Form.Group>
                        <Button
                          variant="danger"
                          size="lg"
                          block
                          className="rounded-button mb-3"
                          onClick={() => {
                            if (password !== null && password === confirmation) {
                              console.log(`
                                first name : ${first_name} 
                                last name: ${last_name}
                                email: ${email}
                                password: ${password}
                                confirmation: ${confirmation}`
                              )
                              window.location.href = '/'
                            } else {
                              console.log('Password tidak sama')
                            }
                            this.submit(first_name, last_name, email, password, confirmation)
                          }}
                        >
                          <b>CREATE ACCOUNT</b>
                        </Button>

                        <hr/>
                        <Form.Group>
                          <Form.Text className="text-white h6 text-center">
                            Already have an account ? <Link to="/login" className="text-decoration-none h5">Sign in</Link>
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