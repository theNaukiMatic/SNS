import React, {Component} from 'react';

//imorting my components
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Profile from './ProfileComponent';
import Notice from './NoticeComponent';
import Signup from './SignupConponent';
import Groups from './GroupsComponent';
import GroupDetail from './GroupDetailComponent';
import GroupMembers from './GroupMembers';
//

import { Switch, Route, Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        users: state.users,
        comments: state.comments,
        notices: state.notices,
        groups:state.groups,
        groupchat: state.groupchat
    }
}
const mapDispatchToProps = dispatch => ({
  
  
});


class Main extends Component{
    constructor(props){
        super(props);
        console.log("Users:  "+ this.props.users);
        console.log("comments:  "+ this.props.comments);
        console.log("groups:" + this.props.groups)
        this.state = {
            
        }
    }
    
    render(){


        const GroupwithId = ({match}) => {

            return(
              <GroupDetail  group={this.props.groups.filter((group) => group._id === match.params.groupId)[0]}
                            groupchat={this.props.groupchat.filter((chat) => chat.group === match.params.groupId)}
              />
              );
          };
        //   const GroupMem = ({match}) => {

        //     return(
        //       <GroupDetail  group={this.props.groups.filter((group) => group._id === match.params.groupId)[0]}
        //       />
        //       );
        //   };

        return(
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home' component={() => <Home />} />
                        <Route exact path='/signup' component={() => <Signup />} />
                        <Route exact path="/profile" component={() => <Profile users={this.props.users}/>} />
                        <Route exact path="/notice_board" component={() => <Notice notices={this.props.notices} comments={this.props.comments} />} />
                        <Route exact path='/groups' component={() => <Groups groups={this.props.groups}/>} />
                        {/* <Route path='/groups/:groupId/members' component={GroupMem} /> */}
                        <Route path='/groups/:groupId' component={GroupwithId} />
                        
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));