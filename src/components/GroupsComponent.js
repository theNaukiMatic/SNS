import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm} from 'react-redux-form';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class GroupForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
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
        this.props.joinGroup(this.props.groupId, values.password);
        this.toggleModal();
    } 
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-user"></span>Join Group</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Join Group</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="password" md={2}>Password</Label>
                                <Col md={10}>
                                    <Control.text model=".password" id="password" name="password"
                                        placeholder="password"
                                        className="form-control"
                                            />
                                </Col>
                            </Row>                     
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="success">
                                    Join Group
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}

function RenderGroups({groups,me}){
    // const ha = groups.filter((group) => me.groups.includes(group) == true);
    const gro = me.groups.map((group) => {
        return(
            <div className="row">
                <div className="col-6"  key={group._id}>
                    <Link to={`/groups/${group._id}`}>
                        <Card className="col-12">
                            <CardTitle><h3>{group.name}</h3>
                            <p>{group.description}</p>
                            </CardTitle>
                        </Card>
                    </Link>
                </div>
            </div>
        );
    });
    return(
        <div>{gro}</div>
    );
}

class JoinGroups extends Component{
    render(){
        const gro = this.props.groups.map((group) => {
            return(
                <div className="row">
                    <div className="col-6"  key={group._id}>
                            <Card className="col-12">
                                <CardTitle><h3>{group.name}</h3>
                                <p>{group.description}</p>
                                </CardTitle>
                                <CardBody>
                                    Admin : {group.admin.username}   
                                </CardBody>
                                <GroupForm joinGroup={this.props.joinGroup} groupId={group._id}/>
                                <div className="mb-3"></div>
                            </Card>
                    </div>
                </div>
            );
        });
        
        return(
                
                <div>
                    <div className="row mb-5 mt-3">
                    <h1><span className="fa fa-users"></span> All Groups</h1>
                </div>
                    <div>{gro}</div>                
                </div>
            
        );
    }
}

class Groups extends Component{
    constructor(props) {
        super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.props.makeGroup(values.name, values.password, values.description);
    } 

    render(){
        if (this.props.groups.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.groups.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.groups.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        
        else{
            const me = this.props.users.filter((user) => user.username === this.props.auth.user.username)[0];
        console.log(me);

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Groups</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div>
                    <h2 className="mb-3">Make a new Group</h2>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="name" md={2}>Group Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Name for your Group"
                                    className="form-control"
                                        />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="password" md={2}>Password</Label>
                            <Col md={10}>
                                <Control.text model=".password" id="password" name="password"
                                    placeholder="password"
                                    className="form-control"
                                        />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="password" md={2}>Description</Label>
                            <Col md={10}>
                                <Control.textarea model=".description" id="description" name="description"
                                    placeholder="group description"
                                    className="form-control"
                                        />
                            </Col>
                        </Row>                        
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                <Button type="submit" color="success" >
                                Make Group
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
                <hr></hr>
                <JoinGroups groups={this.props.groups.groups} joinGroup={this.props.joinGroup}/>
                <div className="row mb-5 mt-3">
                    <h1><span className="fa fa-users"></span>Your Groups</h1>
                </div>
                <RenderGroups groups={this.props.groups.groups} me={me}/>
                
            </div>
        );

        }
        
    }
}
export default Groups;