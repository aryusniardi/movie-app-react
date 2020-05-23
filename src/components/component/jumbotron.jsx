import React, {Component} from "react";
import { Jumbotron, Container, Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default class MovieJumbotron extends Component{
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      movie: [],
      credits: []
    }
  }

  componentDidMount() {
    console.log(this.props.id)

    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US`
    ).then((result) => result.json()
    ).then((result) => {
        this.setState({
          isLoaded: true,
          movie: result,
        });
      }
    ).catch((error) => this.setState({ error, isLoaded: true }));

    fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}/credits?api_key=e526577fc936f61b1a3711898d02e8dd`,
      {
        method: "GET",
      }
    ).then((result) => result.json()
    ).then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          credits: result.cast,
        });
      }
    ).catch((error) => this.setState({ error, isLoaded: true }));
  }

  render() {
    const {movie, credits, error, isLoaded} = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <Jumbotron
            style={{
              background: `
                        linear-gradient(to top, 
                          rgba(15, 15, 15, 1) 0%, 
                          rgba(15, 15, 15, .75) 20%, 
                          rgba(15, 15, 15, .75) 50%, 
                          rgba(15, 15, 15, .75) 75%, 
                          rgba(15, 15, 15, 1) 100%),
                        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
                    `,
            }}
            className="movie-jumbotron"
          >
            <Container className="d-flex h-100">
              <Row className="my-auto">
                <Col className="my-auto" xl={6}>
                  <h1 className="section-title mb-3">{movie.title}</h1>
                  <div>
                    <p className="section-overview">{movie.overview}</p>
                    <p className="section-overview">
                      Starring : <span />
                      {credits.slice(0, 3).map((cast) => (
                        <span className="font-italic font-weight-bold">
                          {cast.name}, <span />
                        </span>
                      ))}
                    </p>
                  </div>
                  {/* <hr className="my-2" /> */}

                  <p className="lead">
                    <Button
                      // onClick={handleShow}
                      size="md"
                      color="danger"
                      className="font-weight-bold"
                      style={{ width: `fit-content` }}
                    >
                      <h5 className="h6 align-items-center my-auto font-weight-bold px-1">
                        <FontAwesomeIcon
                          icon={faPlay}
                          mask={"fab"}
                          className="mr-2 centered v-50"
                        />{" "}
                        Play
                      </h5>
                    </Button>
                    <Button
                      // onClick={handleShow}
                      size="md"
                      color="outline-secondary"
                      className="font-weight-bold ml-3"
                      style={{ width: `fit-content` }}
                    >
                      <h5 className="h6 align-items-center my-auto font-weight-bold">
                        <FontAwesomeIcon
                          icon={faPlus}
                          mask={"fab"}
                          className="mr-2 centered v-50"
                        />{" "}
                        My List
                      </h5>
                    </Button>
                  </p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </React.Fragment>
      );
    }
  }
};