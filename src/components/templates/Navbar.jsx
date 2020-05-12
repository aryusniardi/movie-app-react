import React, {Component} from 'react';
import {Navbar, Container, Button} from 'react-bootstrap';
import Logo from '../../assets/logo.svg';

export default class NavigationBar extends Component {
    // componentDidMount() {
    //     window.addEventListener('scroll', this.scrollFunction)
    // }
    
    // scrollFunction() {
    //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //         document.getElementById("navbar").style.top = "0";
    //     } else {
    //         document.getElementById("navbar").style.top = "-9vh";
    //     }
    // }

    render() {
        return (
          <Navbar variant="dark" expand="lg" fixed="top" className="px-5 navigationBar">
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={Logo}
                  height="30"
                  className="d-inline-block align-top navbar-brand img navigationBar"
                />{' '}
                <h1 className="navbar_brand">Movie</h1>
              </Navbar.Brand>
              <Button size="md" variant="danger" className="ml-auto font-weight-bold navigationBar" style={{ width: `10vw`}}>
                  Sign in
              </Button>
          </Navbar>
        );
    }
}

// window.scroll = function() {
//     scrollFunction()
// }

// function scrollFunction() {
    
// }