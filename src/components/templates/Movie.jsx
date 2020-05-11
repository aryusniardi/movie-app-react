import React from 'react';
import {Card, Button} from 'react-bootstrap';

export default function({id, title, overview, poster}) {
    return (
        <React.Fragment>
            <Card style={{ width: 'auto'}} className="border-0 ">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster}`} className="shadow-sm rounded"/>
                {/* <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{overview}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body> */}
            </Card>
        </React.Fragment>
    )
}