import React, {Component} from 'react';

import {Card, CardImg ,CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Row, Col, Label, ModalFooter} from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';


function RenderProfile({user}){
    return(
        <div className="row">
            <div className="col-12 col-md-3 offset-md-2">
                <Card>
                    <CardImg top src={user.image} alt={user.firstname} />
                </Card>
            </div>
            <div className="col-12 col-md-6">
                <Card>
                    <CardBody>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Name:</h4></div>
                            <div className="col-12 col-md-8"><h4>{user.firstname} {user.lastname}</h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>UserName:</h4></div>
                            <div className="col-12 col-md-8"><h4>{user.username} </h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Date of Birth:</h4></div>
                            <div className="col-12 col-md-8"><h4>{user.dateofbirth} </h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Bio:</h4></div>
                            <div className="col-12 col-md-8"><h4>{user.bio} </h4></div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            
        </div>
    );
}
class ProfileForm extends Component{
    render(){
        return(
            <div>
                <Form model="profileForm" >
                    <Row className="form-group">
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <Control.text model=".firstname" id="firstname" name="firstname"
                                    placeholder="First Name"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        
                        <Row className="form-group">
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <Control.text model=".lastname" id="lastname" name="lastname"
                                    placeholder="Last Name"
                                    className="form-control"
                                />
    
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <Control.text model=".email" id="email" name="email"
                                    placeholder="Email"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="bio" md={2}>Your Bio</Label>
                            <Col md={10}>
                                <Control.textarea model=".bio" id="bio" name="bio"
                                    rows="12"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Update Bio
                                </Button>
                            </Col>
                        </Row>  
                    </Form>
            </div>
        );
    }
    
}

function Profile(props){
    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 col-md-6 offset-md-5">
                    <h1>Your Profile</h1>
                </div>
            </div>
            <RenderProfile user={props.users.filter((user) => user._id === "5eac095b9b7ef840902b93fb")[0]} />
            {/* <ProfileForm /> */}
        </div>
    );
}
export default Profile;