import React, {Component} from 'react';
import {Card, CardImg ,CardBody,CardTitle,  Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderGroups({groups}){
    const gro = groups.map((group) => {
        return(<div>
            <div key={group._id} className="row">
                <Link to={`/groups/${group._id}`}>
                    <Card className="col-12 mb-5">
                        <CardTitle><h3>{group.name}</h3>
                        <p>{group.description}</p>
                        </CardTitle>
                        <CardBody>
                        
                            
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
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Groups</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <h1>Groups</h1>
                </div>
                <RenderGroups groups={this.props.groups} />
                
            </div>
        );
    }
}
export default Groups;