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
//

import { postSignup, fetchUsers,fetchGroups,fetchComments,fetchNotices,fetchGroupchat,loginUser, logoutUser,
            updateProfile,postNotice,postComment, deleteNotice, deleteComment, makeGroup, joinGroup, postChat,
            uploadProfile } from '../redux/ActionCreators';

import { Switch, Route, Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        users: state.users,
        comments: state.comments,
        notices: state.notices,
        groups:state.groups,
        groupchat: state.groupchat,
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => ({
    postSignup: (username, password,firstname, lastname, email, dateofbirth, bio, AAA, teacher) => dispatch(postSignup(username, password, firstname, lastname, email, dateofbirth, bio,AAA, teacher)),
    updateProfile: (firstname, lastname, email, dateofbirth, bio) => dispatch(updateProfile(firstname, lastname, email, dateofbirth, bio)),
    postNotice:(title, message) => dispatch(postNotice(title, message)),
    postComment:(comment, notice) => dispatch(postComment(comment, notice)),
    deleteNotice:(noticeId) => dispatch(deleteNotice(noticeId)),
    deleteComment:(commentId) => dispatch(deleteComment(commentId)),
    makeGroup:(name,password,description) => dispatch(makeGroup(name,password,description)),
    joinGroup:(groupId, password) => dispatch(joinGroup(groupId, password)),
    postChat:(message,groupId) => dispatch(postChat(message, groupId)),
    uploadProfile:(picture) => dispatch(uploadProfile(picture)),
    

    fetchUsers: () =>{dispatch(fetchUsers())},
    fetchGroups: () =>{dispatch(fetchGroups())},
    fetchComments: () =>{dispatch(fetchComments())},
    fetchNotices: () =>{dispatch(fetchNotices())},
    fetchGroupchat: () =>{dispatch(fetchGroupchat())},
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())

});


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
        this.props.fetchUsers();
        this.props.fetchGroups();
        this.props.fetchComments();
        this.props.fetchNotices();
        this.props.fetchGroupchat();
      }
    
    render(){
        console.log(this.props.users);


        const GroupwithId = ({match}) => {

            return(
              <GroupDetail  group={this.props.groups.groups.filter((group) => group._id === match.params.groupId)[0]}
                            groupIsLoading={this.props.groups.isLoading}
                            groupErrMess={this.props.groups.errMess}

                            groupchat={this.props.groupchat.groupchat.filter((chat) => chat.group === match.params.groupId)}
                            groupchatIsLoading={this.props.groupchat.isLoading}
                            groupchatErrMess={this.props.groupchat.errMess}

                            postChat={this.props.postChat}
              />
              );
          };

          const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              this.props.auth.isAuthenticated
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/signup',
                    state: { from: props.location }
                  }} />
            )} />
          );

        return(
            <div>
                <Header auth={this.props.auth} 
                        loginUser={this.props.loginUser} 
                        logoutUser={this.props.logoutUser} />
                <div>
                    <Switch>
                        <Route path='/home' component={() => <Home />} />
                        <Route exact path='/signup' component={() => <Signup postSignup={this.props.postSignup}/>} />
                        <PrivateRoute exact path="/profile" component={() => <Profile users={this.props.users} auth={this.props.auth} 
                                        updateProfile={this.props.updateProfile} uploadProfile={this.props.uploadProfile}/>} />
                        <PrivateRoute exact path="/notice_board" component={() => <Notice notices={this.props.notices} 
                                        comments={this.props.comments} postNotice={this.props.postNotice} postComment={this.props.postComment} 
                                        deleteNotice={this.props.deleteNotice} deleteComment={this.props.deleteComment}/>} />
                        <PrivateRoute exact path='/groups' component={() => <Groups groups={this.props.groups} makeGroup={this.props.makeGroup} joinGroup={this.props.joinGroup}
                                                                            auth={this.props.auth} users={this.props.users.users}
                                                                            fetchUsers={this.props.fetchUsers}/>} />
                        <PrivateRoute path='/groups/:groupId' component={GroupwithId} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));