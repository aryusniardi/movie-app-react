import React from 'react';
import {Card} from 'reactstrap';
import {Link} from 'react-router-dom'

export default function({id, title, overview, poster}) {
    return (
        <React.Fragment>
            <Card style={{ width: 'auto'}} className="border-0 movie-mask">
                <Link to={`/detail/${id}`}>
                    <div className="mask-movie text-center">
                        {title}
                    </div>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${poster}`} className="shadow-sm rounded"/>
                </Link>
            </Card>
        </React.Fragment>
    )
}