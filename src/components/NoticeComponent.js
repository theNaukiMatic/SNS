import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { Control, LocalForm, Errors } from 'react-redux-form';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

class AuthorDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);

    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-user"></span> {this.props.author.firstname} {this.props.author.lastname}</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.author.firstname} {this.props.author.lastname}</ModalHeader>
                    <ModalBody>
                    <img src={this.props.author.image} alt={this.props.author.name}></img>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Name:</h4></div>
                            <div className="col-12 col-md-8"><h4>{this.props.author.firstname} {this.props.author.lastname}</h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>UserName:</h4></div>
                            <div className="col-12 col-md-8"><h4>{this.props.author.username} </h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Email:</h4></div>
                            <div className="col-12 col-md-8"><h4>{this.props.author.email} </h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Date of Birth:</h4></div>
                            <div className="col-12 col-md-8"><h4>{this.props.author.dateofbirth} </h4></div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-12 col-md-4"><h4>Bio:</h4></div>
                            <div className="col-12 col-md-8"><h4>{this.props.author.bio} </h4></div>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}

// function onError(e){
//     console.log("error in file viewer");
//   }

class PostComment extends Component{
    constructor(props) {
        super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.props.postComment(values.newcom, this.props.notice);
    } 
    render(){
        return(
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Col md={{size:6, offset: 1}}>
                        <Control.text model=".newcom" id="newcom" name="newcom"
                            placeholder="comment"
                            className="form-control"
                        />
                    </Col>
                    <Col md={{size:4}}>
                        <Button type="submit" color="primary">
                        Add Comment
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        );
    }
}
function RenderComments({comments,postComment,notice, deleteComment}){
    const com = comments.map((comment) => {
        return(
                <div className="row" key={comment._id}>
                    <div className="col-6 offset-1">
                        <p>-- {comment.comment}<strong> by {comment.author.firstname}</strong></p>
                        {/* <p>--by {comment.author.firstname}</p> */}
                    </div>
                    <div className="col-2">
                        <Button color="danger" onClick={() => deleteComment(comment._id)}>Delete</Button>
                    </div>
                </div>
        );
    });
    if (com === null){
        return(<div></div>);
    }
    return(
        <div>
            <hr></hr>
            <div className="row">
                <div className="col-8 offset-1">
                    <h4>Comments</h4>
                </div>
            </div>
            {com}
            <PostComment postComment={postComment} notice={notice} />
        </div>
    );
}

class PostNotice extends Component{

    constructor(props) {
        super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        this.props.postNotice(values.title, values.message);
    } 
    render(){
        return(
        <div>
            <h2 className="mb-3">Post a new Notice</h2>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Label htmlFor="title" md={2}>Title</Label>
                    <Col md={10}>
                        <Control.text model=".title" id="title" name="title"
                            placeholder="Title"
                            className="form-control"
                                />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Label htmlFor="message" md={2}>Message</Label>
                    <Col md={10}>
                        <Control.textarea model=".message" id="message" name="message"
                            placeholder="message"
                            className="form-control"
                                />
                    </Col>
                </Row>
                
                <Row className="form-group">
                    <Col md={{size:10, offset: 2}}>
                        <Button type="submit" color="primary">
                       Post Notice
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        </div>
        );
    }
}
function RenderNotices({notices,comments,postComment, deleteNotice, deleteComment}){
    const not = notices.map((notice) =>{
        

        return(
            <div key={notice._id} className="row">
                <Card className="col-12 mb-5">
                    <CardTitle></CardTitle>
                    <CardBody>
                        <h2>{notice.title}</h2>
                        <h5>{notice.message}</h5>
                        <Button color="danger" onClick={() => deleteNotice(notice._id)}>Delete</Button>
                        {/* <FileViewer
                            fileType={notice.fileType}
                            filePath={notice.filePath}
                            errorComponent={CustomErrorComponent}
                            onError={onError}
                        /> */}
                        <hr></hr>
                        <div className="row">
                        <div className="col-1 " >
                                <p>by: </p>
                            </div>
                            <div className="col-2" >
                                <p>{<AuthorDetail author={notice.author} />}</p>
                            </div>
                            <div className="col-3">
                            <p>on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(notice.createdAt)))}</p>
                            </div>
                        </div>
                        <RenderComments comments={comments.filter((coms) => coms.notice === notice._id)}
                                             postComment={postComment} notice={notice._id} deleteComment={deleteComment}/>

                        
                    </CardBody>
                </Card>
            </div>
        );
        
        
    });
    return(
        <div>{not}</div>
    );
    
}


function Notice(props){
    if (props.comments.isLoading ) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.comments.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.comments.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else if (props.notices.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.notices.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.noitces.errMess}</h4>
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
                    <BreadcrumbItem active>Notice Board</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div >
                <PostNotice postNotice={props.postNotice}/>
            </div>
            <div className="row mt-5">
                <div className="col-12 mb-5">
                    <h1><span className="fa fa-envelope"></span>   Notice Board</h1>
                </div>
            </div>
            <RenderNotices notices={props.notices.notices} comments={props.comments.comments} postComment={props.postComment}
                             deleteNotice={props.deleteNotice} deleteComment={props.deleteComment}/>
        
        </div>
    );
}
export default Notice;