import React, {Component} from 'react';

//remove later after connecting to redux
import {NOTICECOM} from '../shared/noticeComments';
import {NOTICE} from '../shared/notice';
//

//imorting my components
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Profile from './ProfileComponent';
import Notice from './NoticeComponent';
import Signup from './SignupConponent';
//

import { Switch, Route, Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        users: state.users,
        comments: state.comments,
        notices: state.notices
    }
}
const mapDispatchToProps = dispatch => ({
  
  
});


class Main extends Component{
    constructor(props){
        super(props);
        console.log("Users:  "+ this.props.users);
        console.log("comments:  "+ this.props.comments);
        this.state = {
            // users:USERS,
            notices:NOTICE,
            comments:NOTICECOM
        }
    }
    
    render(){
        return(
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home' component={() => <Home />} />
                        <Route path='/signup' component={() => <Signup />} />
                        <Route path="/profile" component={() => <Profile users={this.props.users}/>} />
                        <Route path="/notice_board" component={() => <Notice notices={this.props.notices} comments={this.props.comments} />} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));