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

import { fetchUsers,fetchGroups,fetchComments,fetchNotices} from '../redux/ActionCreators';

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
  
    fetchUsers: () =>{dispatch(fetchUsers())},
    fetchGroups: () =>{dispatch(fetchGroups())},
    fetchComments: () =>{dispatch(fetchComments())},
    fetchNotices: () =>{dispatch(fetchNotices())}
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
      }
    
    render(){


        const GroupwithId = ({match}) => {

            return(
              <GroupDetail  group={this.props.groups.groups.filter((group) => group._id === match.params.groupId)[0]}
                            groupIsLoading={this.props.groups.isLoading}
                            groupErrMess={this.props.groups.errMess}

                            groupchat={this.props.groupchat.filter((chat) => chat.group === match.params.groupId)}
              />
              );
          };

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