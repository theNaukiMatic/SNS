import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


//for downloading Users
export const fetchUsers = () => (dispatch) => {

    dispatch(usersLoading());

    return fetch(baseUrl + 'users')
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

    return fetch(baseUrl + 'groups')
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

    return fetch(baseUrl + 'comments')
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