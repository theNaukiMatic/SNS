import React, {Component} from 'react';
import {Nav, Navbar, NavbarBrand ,NavItem, Button, NavbarToggler, Collapse,
    Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label} from 'reactstrap';
    import {Jumbotron} from 'reactstrap';
import { NavLink , Link} from 'react-router-dom';
class Header extends Component{

    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen : false
        };
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
                        </Nav>
                        <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
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
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input}  />
                                        Remember me
                                    </Label>
                                </FormGroup>
                                <Button type="submit" value="submit">Login</Button>
                            </Form>
                            <Link to='/signup' onClick={this.toggleModal}>New User ?</Link>
                    </ModalBody>
                </Modal>
                {/* Login Modal ends */}
                <Jumbotron>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <h1>Student Networking System</h1>
                                <p> blah blah blah blah ... </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Header;