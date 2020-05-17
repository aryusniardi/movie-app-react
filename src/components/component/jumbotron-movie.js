import React from 'react'
import {Jumbotron, Container, Row, Col, Image} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function ({movie_id, title, overview, poster_path, backdrop_path}) {
    var styles = {
        "backgroundImage": `linear-gradient(to bottom, #0f0f0fcc 25%, #0f0f0fcc 85%, #0f0f0f 100%), url('https://image.tmdb.org/t/p/original${poster_path}')`,
    }

    return (
        <React.Fragment>
            <Jumbotron className="jumbotron" style={styles}>
                <Container className="d-flex align-items-center">
                    <Row>
                        <Col md={6} className="d-block align-items-center">
                            <h1 className="jumbotron-h1">{title}</h1>
                            <p className="text-justify">{overview}</p>
                        </Col>
                        <Col md={6} className="d-flex">
                            <Image src={`https://image.tmdb.org/t/p/original${backdrop_path}`} fluid/>
                            <div className="mask-video centered v-50"/>
                            <span>
                                <FontAwesomeIcon icon={faPlay} mask={'fab'} size="6x" className="mr-2 centered v-50"/>
                            </span>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </React.Fragment>
    )
}