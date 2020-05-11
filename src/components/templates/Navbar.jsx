import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.svg';

export default class NavigationBar extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.scrollFunction)
    }
    
    scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-9vh";
        }
    }

    render() {
        return (
          <div id="navbar">
            <Navbar sticky="top" bg="transparent" variant="dark">
              <Link to="/" className="justify-content-center mx-auto">
                <img src={Logo} alt="movie" className="navbar-brand img" />
                <h1 className="navbar_brand">Movie</h1>
              </Link>
            </Navbar>
          </div>
        );
    }
}

window.scroll = function() {
    scrollFunction()
}

function scrollFunction() {
    
}