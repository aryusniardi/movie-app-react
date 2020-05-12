import React from 'react';
import Navbar from '../templates/Navbar';
import {Container, Button} from 'react-bootstrap';

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
                    <Navbar/>
                    {upComing.slice(4, 5).map((movie) => (
                            <div className="h-100">
                                <header className = "masthead" style = {{zIndex: `1`, backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000000 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`}}/>
                                <Container className="d-flex h-100 align-items-center section">
                                    <div className="justify-content-center d-block box">
                                        <h1 className="my-0 text-uppercase">{movie.title}</h1>
                                        <h2 className="text-white-50 mx-auto mt-2 mb-5">{movie.overview}</h2>
                                        <div className="d-flex">
                                            <Button className="d-flex mx-4 w-40 justify-content-center button-watch font-weight-bold" variant="danger">watch</Button>{' '}
                                        </div>
                                    </div>
                                </Container>
                            </div>
                    ))}
                </React.Fragment>
            );
        }
    }
}