import React, {Component} from 'react';
import {Jumbotron} from 'reactstrap';

class Home extends Component{
    render(){
        return(
            <div>
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

export default Home;