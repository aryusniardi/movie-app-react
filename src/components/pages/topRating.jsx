import React from 'react';
import {Container} from 'reactstrap'
import MovieJumbotron from '../component/jumbotron'
import Card from '../component/card'
import Video from '../component/video'
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Navbar from '../component/navbar'

export default class TopRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            topRatedMovie: [],
            topRatedTv: [],
            creditsMovie: []
        };
    }

    fetchCreditsMovie({id}) {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e526577fc936f61b1a3711898d02e8dd`, {
                method: "GET",
            }
        ).then((result) => result.json()).then((result) => {
            this.setState({
                isLoaded: true,
                credits: result.cast,
            });
        });
    }

    fetchTopRatedMovie() {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1',
        {
                method: "GET"
            }
        ).then((result) => result.json()
        ).then((result) => {
            this.setState({
                isLoaded: true,
                topRatedMovie: result.results
            })
        }).catch((error) => this.setState({error, isLoaded: true}))
    }

    fetchTopRatedTv() {
        fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1', {
            method: "GET"
        }).then((result) => result.json()).then((result) => {
            this.setState({
                isLoaded: true,
                topRatedTv: result.results
            })
        }).catch((error) => this.setState({
            error,
            isLoaded: true
        }))
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    componentDidMount() {
        const { history } = this.props;
        const rememberMe = localStorage.getItem('rememberMe') === 'true'
        const token = rememberMe ? localStorage.getItem('token') : ''

        if (token === null || token === '') {
            history.push('/login')
        } else {
            this.setState({
                token, rememberMe
            })
        }

        this.fetchTopRatedMovie()
        this.fetchTopRatedTv()

        // console.log(token, rememberMe)

        
    }

    render() {
    const { topRatedMovie, topRatedTv, error, isLoaded } = this.state;

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024,
            },
            items: 6,
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <React.Fragment>
                <>
                    <Navbar/>
                    {topRatedMovie.slice(9, 10).map((movie) => (
                        <>
                            <MovieJumbotron
                                key={movie.id}
                                id={movie.id}
                            />

                            <Container className="p-0">
                                <h1 className="text-movie w-100">Top Rated Movies</h1>
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
                                    {topRatedMovie.map((tv) => (
                                        <Card
                                            id={tv.id}
                                            title={tv.name}
                                            path={tv.poster_path}
                                            rating={tv.vote_average}
                                        />
                                    ))}
                                </Carousel>
                            </Container>
                            {topRatedTv.slice(16, 17).map((movie) => (
                                <Video
                                    id={movie.id}
                                    title={movie.name}
                                    overview={movie.overview}
                                    path={movie.backdrop_path}
                                    vote={movie.vote_average}
                                />
                            ))}
                            <Container className="p-0">
                                <h1 className="text-movie w-100">Top Rated TV Show</h1>
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
                                    {topRatedTv.map((tv) => (
                                        <Card
                                            id={tv.id}
                                            title={tv.name}
                                            path={tv.poster_path}
                                            rating={tv.vote_average}
                                        />
                                    ))}
                                </Carousel>
                            </Container>
                        </>
                    ))}
                </>
            </React.Fragment>
        );}
    }
}