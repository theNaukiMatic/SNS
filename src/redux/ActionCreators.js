import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//signup
export const postSignup = (username, password, firstname, lastname, email, dateofbirth, bio,AAA,teacher) => (dispatch) => {

    const newSignup = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        email: email,
        dateofbirth: dateofbirth,
        bio: bio,
        AAA:AAA,
        teacher:teacher
    }
    console.log('Sign Up detail ', newSignup);

    // const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        body: JSON.stringify(newSignup),
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('post signup successfull' + response);
                        alert("signup was successfull");})
    .catch(error => { console.log('Post Signup ', error.message);
        alert('Sign up was unsuccessfull \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////

//authentication process
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            // dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    // dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}
////////////////////////////////////////////////////////////////////////////

//for downloading Users
export const fetchUsers = () => (dispatch) => {

    dispatch(usersLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (users => dispatch(addUsers(users)))
        .catch(error => dispatch(usersFailed(error.message)));
        
}
export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errmess
});

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

//for downloading Groups

export const fetchGroups = () => (dispatch) => {

    dispatch(usersLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'groups',{
        headers: {
            'Authorization': bearer
        },
    })
    
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (groups => dispatch(addGroups(groups)))
        .catch(error => dispatch(groupsFailed(error.message)));
        
}
export const groupsLoading = () => ({
    type: ActionTypes.GROUPS_LOADING
});

export const groupsFailed = (errmess) => ({
    type: ActionTypes.GROUPS_FAILED,
    payload: errmess
});

export const addGroups = (groups) => ({
    type: ActionTypes.ADD_GROUPS,
    payload: groups
});

//for downloading comments

export const fetchComments = () => (dispatch) => {

    dispatch(commentsLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments/',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
        
}
export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//for downloading notices

export const fetchNotices = () => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    dispatch(noticesLoading());

    return fetch(baseUrl + 'noticeBoard',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (notices => dispatch(addNotices(notices)))
        .catch(error => dispatch(noticesFailed(error.message)));
        
}
export const noticesLoading = () => ({
    type: ActionTypes.NOTICES_LOADING
});

export const noticesFailed = (errmess) => ({
    type: ActionTypes.NOTICES_FAILED,
    payload: errmess
});

export const addNotices = (noitces) => ({
    type: ActionTypes.ADD_NOTICES,
    payload: noitces
});


//for downlading groupchat

export const fetchGroupchat = () => (dispatch) => {

    dispatch(groupchatLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'groupchats',{
        headers: {
            'Authorization': bearer
        },
    })
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then (response => response.json())
        .then (groupchats => dispatch(addGroupchat(groupchats)))
        .catch(error => dispatch(groupchatFailed(error.message)));
        
}
export const groupchatLoading = () => ({
    type: ActionTypes.GROUPCHAT_LOADING
});

export const groupchatFailed = (errmess) => ({
    type: ActionTypes.GROUPCHAT_FAILED,
    payload: errmess
});

export const addGroupchat = (groupchat) => ({
    type: ActionTypes.ADD_GROUPCHAT,
    payload: groupchat
});
///////////////////////////////////////////////


//update profile
export const updateProfile = (firstname, lastname, email, dateofbirth, bio) => (dispatch) => {

    const newProfile = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        dateofbirth: dateofbirth,
        bio: bio,
    }
    console.log('update profile :', newProfile);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/updateProfile ', {
        method: 'PUT',
        body: JSON.stringify(newProfile),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('update profile successfull' + response);
                        dispatch(fetchUsers())})
    .catch(error => { console.log('update profile', error.message);
        alert('could not update profile \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////


//post a new notice
export const postNotice = (title, message) => (dispatch) => {

    const newNotice = {
        title:title,
        message:message
    }
    console.log('new notice :', newNotice);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'noticeBoard/', {
        method: 'POST',
        body: JSON.stringify(newNotice),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('notice posted successfully' + response);
                        dispatch(fetchNotices())})
    .catch(error => { console.log('post Notice', error.message);
        alert('could not post notice \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////

//post a new comment
export const postComment = (comment, notice) => (dispatch) => {

    const newComment = {
        comment:comment,
        notice:notice
    }
    console.log('new Comment :', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments/', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('comment posted successfully' + response);
                        dispatch(fetchComments())})
    .catch(error => { console.log('post Comment', error.message);
        alert('could not post comment \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////

//delete a notice
export const deleteNotice = (noticeId) => (dispatch) => {

    const Notice = {
        noitceId:noticeId
    }
    console.log('delete Notice:', Notice);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'noticeBoard/'+noticeId, {
        method: 'DELETE',
        // body: JSON.stringify(Notice),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('notice deleted' + response);
                        dispatch(fetchNotices())})
    .catch(error => { console.log('delete notice', error.message);
        alert('could not delete notice \nError: '+ error.message); })
}

//delete a comment
export const deleteComment= (commentId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments/'+commentId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('comment deleted' + response);
                        dispatch(fetchComments())})
    .catch(error => { console.log('delete comment', error.message);
        alert('could not delete comment \nError: '+ error.message); })
}

//make a new group
export const makeGroup = (name,password,description) => (dispatch) => {

    const newGroup = {
        name:name,
        password:password,
        description:description
    }
    console.log('new Group :', newGroup);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'groups/', {
        method: 'POST',
        body: JSON.stringify(newGroup),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('group made' + response);
                        alert("group made!\nrefresh to see changes");
                        dispatch(fetchGroups())
                    })
    .catch(error => { console.log('makeGroup', error.message);
        alert('group could not be made \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////

//join a group
export const joinGroup = (groupId, password) => (dispatch) => {

    const Group = {
        password:password,
    }
    console.log('group:', Group);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'groups/addToGroup/' + groupId, {
        method: 'POST',
        body: JSON.stringify(Group),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('Group Joined' + response);
                       
                        alert("group joined!\nrefresh to see changes");
                         dispatch(fetchUsers());
                        dispatch(fetchGroups());
                    })
    .catch(error => { console.log('joinGroup', error.message);
        alert('group could not be joined \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////


export const postChat = (message,groupId) => (dispatch) => {

    const newChat = {
        message:message,
        group:groupId
    }
    console.log('newChat:', newChat);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'groupchats', {
        method: 'POST',
        body: JSON.stringify(newChat),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('messagesent' + response);
                        dispatch(fetchGroupchat())})
    .catch(error => { console.log('postChat', error.message);
        alert('message could not be sent \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////

//upload profile photo
export const uploadProfile = (picture) => (dispatch) => {

    const newProfile = {
        imageFile:picture
    }
    console.log('newProfile:', newProfile);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/uploadProfile', {
        method: 'POST',
        body: JSON.stringify(newProfile),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then((response) => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {console.log('messagesent' + response);
                        dispatch(fetchUsers())})
    .catch(error => { console.log('postProfile', error.message);
        alert('profilephoto could not be uploaded \nError: '+ error.message); })
}
/////////////////////////////////////////////////////////////////////////