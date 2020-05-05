import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';

class Home extends Component{
    render(){
        return(
            <div>
                
                <div className="container mt-5">
                    <div className="row mb-5">
                    <h1> <span className="fa fa-home"></span> Home</h1>
                    </div>
                    <div className="row mb-5">
                        <Card>
                            <CardTitle></CardTitle>
                            <CardBody>
                                <h1>What is SNS ?</h1>
                                <p>An online platform which people use to build social networks or social relationship with other people who share similar personal or career interests, activities, backgrounds or real-life connections.</p>
                                <p>This website features a way of interaction among the IIIT family, filling all type of communication gaps among them. The concept of this site is to reduce the barrier of communication that hinders interaction among them. We aim towards bringing all kind of information, knowledge and enthusiasm into a common platform.</p>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="row mb-3">
                        <h1>Features!</h1>
                    </div>

                    <div className="row mb-5">
                        <Card>
                            <CardTitle></CardTitle>
                            <CardBody>
                                <h2><span className="fa fa-envelope"></span> Notice Board</h2>
                                <p>This is a place where teachers can post notices to notify students about upcoming test, assignments etc. Only Teaches and AAA section can post to noticeBoard</p>                            </CardBody>
                        </Card>
                    </div>

                    <div className="row mb-5">
                        <Card>
                            <CardTitle></CardTitle>
                            <CardBody>
                                <h2><span className="fa fa-user"></span> Your Profile</h2>
                                <p>This page displays your profile information. It also have an option to search other users profile. You can also update any part of your profile (exept username) from this page!</p>                            </CardBody>
                        </Card>
                    </div>
                    <div className="row mb-5">
                        <Card>
                            <CardTitle></CardTitle>
                            <CardBody>
                                <h2><span className="fa fa-users"></span> Groups</h2>
                                <p>This is where a user can make a new group or join an existing group. They can also go to groupchat from this page where group members can chat. Group chat is only accessible by group members and you need a password to join a group. This is to avoid spamming.</p>                            </CardBody>
                        </Card>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Home;