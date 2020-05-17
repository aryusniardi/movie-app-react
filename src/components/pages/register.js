import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {Container, Row, Col, Image, Form, Button, Alert} from 'react-bootstrap';
import Instagram from '../../assets/instagram.svg';
import Twitter from '../../assets/twitter.svg';
import Facebook from '../../assets/facebook.svg';

export default class Register extends Component {  
  constructor(props) {
    super(props);

    this.state = {
        first_name: '',
        last_name: '',
        username: '',
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

  submit (first_name, last_name, username, password, confirmation) {
    if (password !== null && password === confirmation) {
      console.log(`
        first name : ${first_name} 
        last name: ${last_name}
        username: ${username}
        password: ${password}
        confirmation: ${confirmation}`
        )
        return (
          <Alert variant="success">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>
              Aww yeah, you successfully read this important alert message. This example
              text is going to run a bit longer so that you can see how spacing within an
              alert works with this kind of content.
            </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep things nice
                and tidy.
            </p>
          </Alert>
        )
        // window.location.href = '/login'
    } else {
      console.log('Password tidak sama')
    }
  }

  componentDidMount() {
      this.fetchPopular()
  }

  render() {
      const {first_name, last_name, username, password, confirmation, error, popular, isLoaded} = this.state;
        if (error) {
          return <div>Error : {error.mesage}</div>;
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          return (
            <React.Fragment>
              <div className="h-100">
                {popular.slice(2, 3).map((movie) => (
                  <>
                <header className="masthead-form" style={{ zIndex: `1`, backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 25%, #0f0f0f 75%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')` }} />
                < div className = "h-100 align-items-center section box-registration ml-auto vertical-center" >
                  <div className=" justify-content-center d-block mx-auto">
                    <Form className="form-box">
                      <h2 className="d-block text-center font-weight-bold text-title text-white m-0 mx-auto">
                        Create Account
                      </h2>
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
                            required
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
                            required
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
                            type="text"
                            placeholder="Username"
                            className="input-group"
                            required
                            onChange={(event) => {
                              this.updateUsername(event.target.value)
                            }}
                            value={this.state.username}
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
                            required
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
                            required
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
                            this.submit(first_name, last_name, username, password, confirmation)
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
                      <div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="form-border w-25"/>
                          <h5 className="mx-3 mt-2">
                            or sign up with
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
                <div className="sosmed">
                </div>
              </div>
              {/* {popular.slice(2, 3).map((movie) => (
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  className="image-masthead"
                />
              ))}
              <header className="masthead vertical-center">
                <Container>
                  <Row>
                    <Col md={{ span: 6, offset: 6 }}>
                      
                    </Col>
                  </Row>
                </Container>
              </header> */}
            </React.Fragment>
          );
      }   
  }
}