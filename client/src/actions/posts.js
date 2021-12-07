import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_POST } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators - Functions that return the actions
export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        const action = { type: FETCH_ALL , payload: data }
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
}

export const createPosts = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPosts(post);
        dispatch( { type: CREATE , payload: data } );
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
       const {data} = await api.updatePost(id, post);
       console.log(data);
       dispatch ( {type: UPDATE , payload: data} );
    //    dispatch(getPosts());
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE , payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch( { type: LIKE_POST , payload: data });

    } catch (error) {
        console.log(error);
    }
}