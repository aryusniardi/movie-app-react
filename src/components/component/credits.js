import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function({id, name, profile}) {
    return (
        <React.Fragment>
            <Card style={{ width: 'auto'}} className="border-0 movie-mask">
                <Link to={`/detail/${id}`}>
                    <div className="recommendation-mask-movie text-center"></div>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${profile}`} className="shadow-sm rounded"/>
                </Link>
            </Card>
            <p className="credit-p text-center">
                {name}
            </p>
        </React.Fragment>
    )
}