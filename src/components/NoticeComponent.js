import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

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

function onError(e){
    console.log("error in file viewer");
  }
function RenderComments({comments}){
    const com = comments.map((comment) => {
        return(
                <div className="row" key={comment._id}>
                    <div className="col-8 offset-1">
                        <p>-- {comment.message}<strong> by {comment.author.firstname}</strong></p>
                        {/* <p>--by {comment.author.firstname}</p> */}
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
        </div>
    );
}
function RenderNotices({notices,comments}){
    const not = notices.map((notice) =>{
        

        return(
            <div key={notice._id} className="row">
                <Card className="col-12 mb-5">
                    <CardTitle></CardTitle>
                    <CardBody>
                        <h2>{notice.title}</h2>
                        <h5>{notice.message}</h5>
                        {/* <FileViewer
                            fileType={notice.fileType}
                            filePath={notice.filePath}
                            errorComponent={CustomErrorComponent}
                            onError={onError}
                        /> */}
                        <hr></hr>
                        <div className="row">
                            <div className="col-6">
                                <p>by: {<AuthorDetail author={notice.author} />}
                                on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(notice.dateofpost)))}</p>
                            </div>
                        </div>
                        <RenderComments comments={comments.filter((coms) => coms.notice._id === notice._id)}/>
                        
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

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Notice Board</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row mt-5">
                <div className="col-12 mb-5">
                    <h1><span className="fa fa-envelope"></span>   Notice Board</h1>
                </div>
            </div>
            <RenderNotices notices={props.notice} comments={props.comments} />
        
        </div>
    );
}
export default Notice;