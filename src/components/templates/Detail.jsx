import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap'
import StarRatings from 'react-star-ratings';
import PropTypes from "prop-types";
import Credit from '../component/credits'
import Carousel from "react-multi-carousel";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      movie: [],
      credits: [],
      recommendation: []
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    console.log(params.id)


    // Fetch data movie params movie_id
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US`
    ).then((result) => result.json()
    ).then((result) => {
        this.setState({
          isLoaded: true,
          movie: result,
        });
      }
    ).catch((error) => this.setState({ error, isLoaded: true }));

    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=e526577fc936f61b1a3711898d02e8dd`, 
      {
        method: "GET"
      }
    ).then((result) => result.json()
    ).then((result) => {
      console.log(result)
      this.setState({
        isLoaded: true,
        credits: result.cast
      })
    })

    // Fetch data recommendation params movie_id
    fetch(`
      https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1`,
      ).then((result) => result.json()
      ).then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true, 
          recommendation: result.results
        })
      }
    ).catch((error) => this.setState({error, isLoaded: true}))

  }

  render() {
    const { error, isLoaded, movie, recommendation, credits } = this.state;
    const { location } = this.props;
    const responsive = {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024,
        },
        items: 8,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0,
        },
        items: 4,
        partialVisibilityGutter: 30,
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464,
        },
        items: 4,
        partialVisibilityGutter: 30,
      },
    }
    console.log(location.pathname)
    
    if (error) {
      return <div>Error : {error.mesage}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          {/* <Navbar /> */}
          <div
            className="detail-movie"
            style={{
              backgroundImage: `linear-gradient(to top, #0f0f0f 0%, rgba(0, 0, 0, 0.75) 25%, rgba(0, 0, 0, 0.75) 75%, #0f0f0f 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
            }}
          >
            <Row className="w-100 align-items-center p-5">
              <Col xl={4} lg={12} md={12} sm={12} xs={12} className="p-5">
                  <div className="detail-section">
                    <div className="detail-description mx-auto">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        className="detail-poster"
                        alt="img"
                      />
                    </div>
                  <div className="detail-rating mx-auto text-center">
                    <h1 className="pt-4">{movie.vote_average} / 10</h1>
                      <StarRatings
                        className="start-rating"
                        starRatedColor="yellow"
                        rating={movie.vote_average / 2}
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name="rating"
                        starDimension="20px"
                        starSpacing="5px"
                      />
                  </div>
                  </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={12} className="p-5">
                <div className="detail-section">
                  <div className="detail-description">
                    <div className="detail-title-box">
                      <h1 className="detail-title">{movie.title}</h1>
                    </div>
                    <ul className="pt-2">
                      {movie.genres.map((movie) => (
                        <li>{movie.name}</li>
                      ))}
                    </ul>
                    <p className="detail-overview text-justify">
                      {movie.overview}
                    </p>
                  </div>
                </div>
                <h2 className="mt-4 font-weight-bold">Cast</h2>
                <Carousel
                  additionalTransfrom={0}
                  autoPlaySpeed={3000}
                  centerMode={false}
                  focusOnSelect={false}
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                  responsive={responsive}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                  className=""
                  containerClass="container"
                  dotListClass=""
                  draggable
                  infinite={false}
                  itemClass="mx-1"
                  showDots={false}
                >
                  {credits.map((cast) => (
                    <Credit
                      key={cast.id}
                      id={cast.id}
                      name={cast.character}
                      profile={cast.profile_path}
                    // title={movie.title}
                    />
                  ))}
                </Carousel>
              </Col>
                {/* <Carousel
                  className="px-4"
                  additionalTransfrom={0}
                  autoPlaySpeed={3000}
                  centerMode={false}
                  focusOnSelect={false}
                  infinite
                  itemClass="mx-2"
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                  responsive={responsive}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  {recommendation.map((movie) => (
                    <Recommendation
                      key={movie.id}
                      id={movie.id}
                      overview={movie.overview}
                      poster={movie.backdrop_path}
                      // title={movie.title}
                    />
                  ))}
                </Carousel> */}
              {/* <Col xl={6} lg={6} md={12} sm={12} xs={12} className="p-5">
                <div className="detail-section">
                    <div className="detail-description">
                        <h3>alskndalsknd</h3>
                    </div>
                </div>
              </Col> */}
            </Row>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Detail;