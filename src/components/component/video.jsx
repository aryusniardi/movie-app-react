import React from "react";
import { Container, Row, Col, Button} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ({ id, title, overview, path, vote }) {
    console.log(path)
  return (
    <React.Fragment>
      <Container className="p-5">
        <Row>
          <Col>
            <div
              className="video-image"
              style={{
                background: `
                    url(https://image.tmdb.org/t/p/original${path})
                `,
              }}
            />
          </Col>
          <Col className="video-description">
            <h1>
                {title}
                <p>({vote} / 10)</p>    
            </h1>
            <p>{overview}</p>
            <div className="video-rating"></div>
            <Button
              // onClick={handleShow}
              size="md"
              color="danger"
              className="font-weight-bold"
              style={{ width: `fit-content` }}
            >
              <h5 className="h6 align-items-center my-auto font-weight-bold px-1">
                <FontAwesomeIcon
                  icon={faPlay}
                  mask={"fab"}
                  className="mr-2 centered v-50"
                />{" "}
                Play
              </h5>
            </Button>
            <Button
              // onClick={handleShow}
              size="md"
              color="outline-secondary"
              className="font-weight-bold ml-3"
              style={{ width: `fit-content` }}
            >
              <h5 className="h6 align-items-center my-auto font-weight-bold">
                <FontAwesomeIcon
                  icon={faPlus}
                  mask={"fab"}
                  className="mr-2 centered v-50"
                />{" "}
                My List
              </h5>
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
