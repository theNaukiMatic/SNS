import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

class Notice extends Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Notice Board</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h1>Notice Board</h1>
                    </div>
                </div>
            
        </div>
        );
    }
}
export default Notice;