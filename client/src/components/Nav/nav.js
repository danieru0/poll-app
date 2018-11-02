import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

class Nav extends Component {
    render() {
        return (
            <nav className="navbar">
                <ul className="navbar__menu">
                    <li className="navbar__menu__item">
                        <Link to="/">Create poll</Link>
                    </li>
                    <li className="navbar__menu__item">
                        <Link to="/all">All polls</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav;