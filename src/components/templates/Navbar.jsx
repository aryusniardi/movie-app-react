import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import ModalSignIn from '../component/modal-signin';
import Logo from '../../assets/logo.png';

export default class NavigationBar extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollFunction)
    this.scrollFunction()
  }

  scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      document.getElementById("navbar").style.backgroundColor = "#0f0f0f";
    } else {
      document.getElementById("navbar").style.backgroundColor = "transparent !important";
    }
  }

  render() {
    return (
      <Navbar
        id="navbar"
        variant="dark"
        expand="lg"
        fixed="top"
        className="px-5 navigationBar"
      >
        <Navbar.Brand href="/">
          <img
            alt=""
            src={Logo}
            height="30"
            className="d-inline-block align-top navbar-brand img navigationBar"
          />{" "}
          <h1 className="navbar_brand">Movie</h1>
        </Navbar.Brand>
        <ModalSignIn/>
      </Navbar>
    );
  }
}