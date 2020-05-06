import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.svg';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark d-block">
                <Link to='/'>
                    <img src={Logo} alt="movie" className="navbar-brand img"/>
                    <h1 className="navbar_brand" >Movie</h1>
                </Link>
            </nav>
        )
    }
}