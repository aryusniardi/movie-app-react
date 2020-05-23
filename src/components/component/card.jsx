import React from "react";
import {Link} from 'react-router-dom'
import {
  Card, CardBody, CardLink, CardText
} from "reactstrap";

export default function ({id, title, path, rating}) {
    return (
      <React.Fragment>
        <Link to="/">
          <Card
            style={{
              background: `
                    linear-gradient(to bottom, 
                          rgba(15, 15, 15, 0) 0%, 
                          rgba(15, 15, 15, 0) 85%, 
                          rgba(15, 15, 15, 1) 100%),
                    url('https://image.tmdb.org/t/p/original/${path}')
                    `,
            }}
          >
            <CardBody>
              <CardText>{rating} / 10</CardText>
            </CardBody>
          </Card>
        </Link>
      </React.Fragment>
    );
}
