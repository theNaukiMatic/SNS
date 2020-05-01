import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand ,NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{
    render(){
        return (
            <div>
                <Navbar dark>
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">Student Networking System</NavbarBrand>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/home'>Home</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                </Navbar>
            </div>
        );
    }
}

export default Header;