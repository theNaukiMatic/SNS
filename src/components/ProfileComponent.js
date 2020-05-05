import React, {Component} from 'react';

import {Card, CardImg ,CardBody,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';

import ImageUploader from 'react-images-upload';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderProfile({user}){
    return(
        <div>
            <div className="row">
                <div className="col-12 col-md-6 offset-md-4 mb-3">
                    <h1><span className="fa fa-user"></span>   Your Profile</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-3 offset-md-1">
                    <Card>
                        <CardImg top src={baseUrl + user.image} alt={user.firstname} />
                    </Card>
                </div>
                <div className="col-12 col-md-7">
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
                                <div className="col-12 col-md-4"><h4>Email:</h4></div>
                                <div className="col-12 col-md-8"><h4>{user.email} </h4></div>
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
        </div>
    );
}
class ProfileForm extends Component{

    constructor(props) {
        super(props);
         this.state = { 
             pictures: [] 
            };
         this.onDrop = this.onDrop.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleSubmit2 = this.handleSubmit2.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        this.props.uploadProfile(picture[0]);
    }
    handleSubmit(values) {
        this.props.updateProfile(values.firstname, values.lastname, values.email, values.dateofbirth, values.bio);
        // this.props.uploadProfile(values.photo);
    } 
    handleSubmit2(values) {
        // this.props.updateProfile(values.firstname, values.lastname, values.email, values.dateofbirth, values.bio);
        this.props.uploadProfile(values.photo);
    } 


    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12 col-md-6 mt-5 mb-3">
                        <hr></hr>
                        <h1>Update your profile</h1>
                    </div>
                </div>
                <ImageUploader
                    withIcon={true}
                    buttonText='Upload Profile Picture'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <LocalForm onSubmit={(values) => this.handleSubmit2(values)}>
                    <Row className="form-group">
                        <Label htmlFor="photo" md={2}>upload photo</Label>
                        <Col md={10}>
                            <Control.file model=".photo" id="photo" name="photo"
                                className="form-file"
                                />
                        </Col>
                        <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Upload photo
                                    </Button>
                                </Col>
                            </Row>
                    </Row>
                </LocalForm>
                <div className="row">
                    <div className="col-12 col-md-8">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
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
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="dateofbirth" md={2}>Date of birth</Label>
                                <Col md={10}>
                                    <Control.text model=".dateofbirth" id="dateofbirth" name="dateofbirth"
                                        placeholder="dd/mm/yyyy"
                                        className="form-control"
                                            />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="bio" md={2}>Your Bio</Label>
                                <Col md={10}>
                                    <Control.textarea model=".bio" id="bio" name="bio"
                                        rows="2"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Update Profile
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                    
                </div>


            </div>
        );
    }

}

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false,
            author:{
                firstname:"",
                lastname:"",
                username:"",
                email:"",
                dateofbirth:"",
                bio:""
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values) {
        const find = this.props.users.filter((user) => user.username === values.search)[0];
        // if(find){
        //     alert("user not found!")
        // }
        if(find == null){
            alert("user not found");
        }
        else{
            this.setState( {author:find} );
            this.toggleModal();
        }
            
    } 
    render(){
        
        return(
        <div>
            <LocalForm className="mt-5" onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="firstname" md={{size:2, offset: 2}}>Search other Users</Label>
                    <Col md={6}>
                        <Control.text model=".search" id="search" name="search"
                            placeholder="enter username"
                            className="form-control"
                        />
                    </Col>
                    <Col md={{size:2}}>
                        <Button type="submit" color="primary">
                        Search
                        </Button>
                    </Col>
                </Row>
                <Row className="form-group">

                </Row>
            </LocalForm>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>{this.state.author.firstname} {this.state.author.lastname}</ModalHeader>
                <ModalBody>
                {/* <img src={this.props.author.image} alt={this.props.author.name}></img> */}
                    <div className="row">
                        <div className="col-12 col-md-4"><h4>Name:</h4></div>
                        <div className="col-12 col-md-8"><h4>{this.state.author.firstname} {this.state.author.lastname}</h4></div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-12 col-md-4"><h4>UserName:</h4></div>
                        <div className="col-12 col-md-8"><h4>{this.state.author.username} </h4></div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-12 col-md-4"><h4>Email:</h4></div>
                        <div className="col-12 col-md-8"><h4>{this.state.author.email} </h4></div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-12 col-md-4"><h4>Date of Birth:</h4></div>
                        <div className="col-12 col-md-8"><h4>{this.state.author.dateofbirth} </h4></div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-12 col-md-4"><h4>Bio:</h4></div>
                        <div className="col-12 col-md-8"><h4>{this.state.author.bio} </h4></div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
            

        );
    }
}

function Profile(props){
    console.log(props.auth.user);
    if (props.users.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.users.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.users.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Your Profile</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <RenderProfile user={props.users.users.filter((user) => user.username === props.auth.user.username)[0]} />

                <Search users={props.users.users} />
                <ProfileForm updateProfile={props.updateProfile} uploadProfile={props.uploadProfile}/>


            </div>
        );
}
export default Profile;
