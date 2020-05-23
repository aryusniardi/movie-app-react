import React, {Component} from 'react';
import Movie from './Movie';
import Genre from "../component/genre"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class MovieList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      popular: [],
      upComing: [],
      topRated: [],
      genre: []
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
          popular: result.results
        });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
  }

  fetchTopRated() {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1",
      {
        method: "GET",
      }
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          topRated: result.results,
        });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
  }

  fetchLatest() {
    fetch(
      "https://api.themoviedb.org/3/movie/latest?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US",
      {
        method: "GET",
      }
    )
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          latest: result,
        });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
  }

  fetchGenre() {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US",
      {
        method: "GET"
      }
    ).then(
      (result) => result.json()
    ).then(
      (result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          genre: result.genres
        })
      }
    ).catch((error) => this.setState({error, isLoaded: true}))
  }
  
  componentDidMount() {
    this.fetchUpComing();
    this.fetchPopular();
    this.fetchTopRated();
    this.fetchLatest();
    this.fetchGenre()
  }

  render() {
    const {
      isLoaded,
      error,
      upComing,
      topRated,
      popular,
      genre
    } = this.state;
    
    const responsive = {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024,
        },
        items: 5,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0,
        },
        items: 1,
        partialVisibilityGutter: 30,
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464,
        },
        items: 3,
        partialVisibilityGutter: 30,
      },
    }
    
    const genres = {
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024,
        },
        items: 9,
        partialVisibilityGutter: 40,
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0,
        },
        items: 3,
        partialVisibilityGutter: 30,
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464,
        },
        items: 6,
        partialVisibilityGutter: 30,
      },
    };

    if (error) {
      return <div>Error : {error.mesage}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          <div>
            {/* {topRated.slice(9, 10).map((movie) => (
              <MovieJumbotron
                movie_id={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster_path={movie.backdrop_path}
                backdrop_path={movie.backdrop_path}
              />
            ))} */}
          </div>

          {/* <h1 className="text-title text-center carousel-title my-3">
            Genres
          </h1> */}
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="mx-2"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
            renderDotsOutside={false}
            responsive={genres}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {genre.map((genre) => (
              <Genre
                key={genre.id}
                id={genre.id}
                name={genre.name.toString().toLowerCase()}
              />
            ))}
          </Carousel>

          <h1 className="text-title container carousel-title my-3 mt-5">
            Popular Movie
          </h1>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="mx-2"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {popular.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster={movie.backdrop_path}
              />
            ))}
          </Carousel>

          <h1 className="text-title carousel-title my-5">Up Coming Movies</h1>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="mx-2"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {upComing.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster={movie.backdrop_path}
              />
            ))}
          </Carousel>

          <h1 className="text-title carousel-title my-5">Top Rated Movies</h1>
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass="mx-2"
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {topRated.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                poster={movie.backdrop_path}
              />
            ))}
          </Carousel>
        </React.Fragment>
      );
    }
  }
}

export default MovieList;