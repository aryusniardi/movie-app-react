import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default function({id, title, overview, poster}) {
    return (
        <React.Fragment>
            <Card style={{ width: 'auto'}} className="border-0 recommendation-movie-mask">
                <Link to={`/detail/${id}`}>
                    <div className="recommendation-mask-movie text-center"></div>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster}`} className="shadow-sm rounded"/>
                </Link>
            </Card>
            <p className="recommendation-p text-center">
                {title}
            </p>
        </React.Fragment>
    )
}