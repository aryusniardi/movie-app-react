import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Container, Button, Row, Col} from 'reactstrap'
import Instagram from "../../assets/instagram.svg";
import Twitter from "../../assets/twitter.svg";
import Facebook from "../../assets/facebook.svg";
import classnames from 'classnames';

export default function() {
    return (
      <React.Fragment>
          <Container>
            <div className="footer">
              <p>Follow us on</p>
              <div className="sosmed">
                  <img
                  alt=""
                  src={Instagram}
                  height="20"
                  />
                  <img
                  alt=""
                  src={Twitter}
                  height="20"
                  />
                  <img
                  alt=""
                  src={Facebook}
                  height="20"
                  />
              </div>
              <Row>
                <Col md={4}>
                  <h2>Heading Footer 1</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <Link>Detail »</Link>
                </Col>
                <Col md={4}>
                  <h2>Heading Footer 2</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <Link>Detail »</Link>
                </Col>
                <Col md={4}>
                  <h2>Heading Footer 3</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <Link>Detail »</Link>
                </Col>
                <hr/>
              </Row>
            </div>
            <hr className="footer-break"/>
            <p className="footer-copyright">Copyright 2020 ©</p>
        </Container>
      </React.Fragment>
    );
}