import React, {Component} from 'react';

//remove later after connecting to redux
import {USERS} from '../shared/users'
//

//imorting my components
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Profile from './ProfileComponent';
//

import { Switch, Route, Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        // users: state.users
    }
}
const mapDispatchToProps = dispatch => ({
  
  
});


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            users:USERS
        }
    }
    render(){
        return(
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home' component={() => <Home />} />
                        <Route path="/profile" component={() => <Profile users={this.state.users}/>} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));