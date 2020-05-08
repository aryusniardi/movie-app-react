import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Movie from './Movie';

class MovieList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            error: null,
            isLoading: false,
            movies: [],
        };
    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1", {
            "method" : "GET"
        })
        .then(result => result.json())
        .then((result => {
            console.log(result)
            this.setState({
                isLoaded: true,
                movies: result.results
            })
        }))
        .catch(error => this.setState({error, isLoaded: true}))
    }
    
    render() {
        const {isLoaded, error, movies} = this.state;
        if (error) {
            return <div>Error : {error.mesage}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <React.Fragment>
                    <Container fluid="md">
                        <Row className="justify-content-md-center">
                            {movies.map(movie => (
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
            )
        }
    }
}

export default MovieList;