import React from 'react';
import Instagram from '../../assets/instagram.svg';
import Twitter from '../../assets/twitter.svg';
import Facebook from '../../assets/facebook.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {Container, Button} from 'react-bootstrap';
import Navbar from '../templates/Navbar'

export default class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            upComing: [],
        };
    }

    fetchUpComing() {
        fetch(
            "https://api.themoviedb.org/3/movie/upcoming?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1", {
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
        .catch((error) => this.setState({
            error,
            isLoaded: true
        }));
    }

    componentDidMount() {
        this.fetchUpComing()
    }

    render() {
        const {upComing, error, isLoaded} = this.state;
        if (error) {
            return (
                <div>
                    Error: {error.message}
                </div>
            )
        } else if (!isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return(
                <React.Fragment>
                    <Navbar />
                    {upComing.slice(4, 5).map((movie) => (
                    <div className="h-100">
                        <header className = "masthead" style = {{zIndex: `1`, backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000000 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`}}/>
                        <Container className="d-flex h-100 align-items-center section">
                            <div className="justify-content-center d-block box">
                                <h1 className="mx-4 my-0 text-uppercase">{movie.title}</h1>
                                <h2 className="text-white-50 mx-4 mt-2 mb-5">{movie.overview}</h2>
                                <div className="d-flex">
                                    <Button className="d-flex mx-4 w-25 justify-content-center button-watch" variant="danger"> 
                                        <h5 className="h5 align-items-center my-auto font-weight-bold p-1">
                                            <span><FontAwesomeIcon icon={faPlay} className="mr-2"/></span>watch
                                        </h5>
                                    </Button>{' '}
                                </div>
                            </div>
                        </Container>
                        <div className="sosmed">
                            <img
                                alt=""
                                src={Instagram}
                                height="30"
                                className="d-block img my-5"
                                />
                            <img
                                alt=""
                                src={Twitter}
                                height="30"
                                className="d-block img my-5"
                            />
                            <img
                                alt=""
                                src={Facebook}
                                height="30"
                                className="d-block img my-5"
                            />
                        </div>
                        
                    </div>
                    ))}
                </React.Fragment>
            );
        }
    }
}