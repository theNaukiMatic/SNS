import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm} from 'react-redux-form';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderGroups({groups}){
    const gro = groups.map((group) => {
        return(
            <div className="row">
                <div className="col-6"  key={group._id}>
                    <Link to={`/groups/${group._id}`}>
                        <Card className="col-12">
                            <CardTitle><h3>{group.name}</h3>
                            <p>{group.description}</p>
                            </CardTitle>
                            <CardBody>
                                Admin : {group.admin.username}
                                
                            </CardBody>
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
        else
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
                <div className="row mb-5 mt-3">
                    <h1><span className="fa fa-users"></span> All Groups</h1>
                </div>
                <RenderGroups groups={this.props.groups.groups} />
                
            </div>
        );
    }
}
export default Groups;