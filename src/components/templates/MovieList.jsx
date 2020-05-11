import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Movie from './Movie';
import Navbar from "./Navbar";


class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      latest: [],
      upComing: [],
    };
  }

  fetchUpComing() {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1",
      {
        method: "GET",
      }
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          upComing: result.results,
        });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
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
    this.fetchUpComing();
    this.fetchPopular();

  }

  render() {
    const { isLoaded, error, popular, upComing} = this.state;
    if (error) {
      return <div>Error : {error.mesage}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Navbar />
          <Container fluid="md">
            <h1 className="text-title">Popular</h1>
            <Row className="justify-content-md-center mb-5 pb-4">
              {popular.slice(0, 4).map((movie) => (
                <Col sm={3} className="py-4">
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    poster={movie.poster_path}
                  />
                </Col>
              ))}
            </Row>

            <h1 className="text-title">Up Coming</h1>
            <Row className="justify-content-md-center">
              {upComing.slice(0, 4).map((movie) => (
                <Col sm={3} className="py-4">
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    poster={movie.poster_path}
                  />
                </Col>
              ))}
            </Row>

            <h1 className="text-title">Popular</h1>
            <Row className="justify-content-md-center mb-5 pb-4">
              {popular.slice(0, 4).map((movie) => (
                <Col sm={3} className="py-4">
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    poster={movie.poster_path}
                  />
                </Col>
              ))}
            </Row>

            <h1 className="text-title">Up Coming</h1>
            <Row className="justify-content-md-center">
              {upComing.slice(0, 4).map((movie) => (
                <Col sm={3} className="py-4">
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    overview={movie.overview}
                    poster={movie.poster_path}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default MovieList;