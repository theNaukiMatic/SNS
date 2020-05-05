import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand ,NavItem, Button, NavbarToggler, Collapse,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label} from 'reactstrap';
    import {Jumbotron} from 'reactstrap';
import { NavLink , Link} from 'react-router-dom';
class Header extends Component{

    constructor(props) {
        super(props);

        this.state = {
          isNavOpen: false,
          isModalOpen : false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render(){
        return (
            <div>
                <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="mr-10" href="/">SNS</NavbarBrand>

                    {/* Navigation links */}
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/home'><span className="fa fa-home"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/notice_board'><span className="fa fa-envelope"></span> Notice Board</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/profile'><span className="fa fa-user"></span> Your Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/groups'><span className="fa fa-users"></span> Groups</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                { !this.props.auth.isAuthenticated ?
                                    <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                    </Button>
                                    :
                                    <div>
                                    <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                    <Button outline onClick={this.handleLogout}>
                                        <span className="fa fa-sign-out fa-lg"></span> Logout
                                        {this.props.auth.isFetching ?
                                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                            : null
                                        }
                                    </Button>
                                    </div>
                                }

                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>



                {/* Login Modal */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input}  />
                                </FormGroup>

                                <Button type="submit" value="submit">Login</Button>
                            </Form>
                            <Link to='/signup' onClick={this.toggleModal}>New User?</Link>
                    </ModalBody>
                </Modal>
                {/* Login Modal ends */}
                <Jumbotron>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h1>Student Networking System</h1>
                                <p> An online platform which people use to build social networks focused on students</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;