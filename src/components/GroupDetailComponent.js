import React, {Component} from 'react';

class GroupDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container">
                <p>{this.props.group.description}</p>
            </div>
        );
    }
}
export default GroupDetail;