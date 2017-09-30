import { combineReducers } from 'redux'

import {
    // category actions
    LIST_CATEGORIES,

    // Post actions
    LIST_POSTS,
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    VOTE_POST,

    // Comment actions
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT
} from '../actions'

const uuidv4 = require('uuid/v4')

const initialState = {
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case LIST_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories,
            })
        default:
            return state
    }
}

const post = (state = initialState, action) => {
    switch (action.type) {
        case LIST_POSTS:
            return Object.assign({}, state, {
                posts: action.posts,
            })
        case ADD_POST:
            return [
                ...state,
                {
                    id: uuidv4(),
                    timestamp: Date.now(),
                    title: action.title,
                    body: action.body,
                    author: action.author,
                    category: action.category,
                    voteScore: 1,
                    deleted: false
                }
            ]
        case DELETE_POST:
            return state.map(post =>
                (post.id === action.id)
                    ? { ...post, deleted: true }
                    : post
            )
        case EDIT_POST:
            return state.map(post =>
                (post.id === action.id)
                    ? { ...post, title: action.title, body: action.body, author: action.author }
                    : post
            )
        case VOTE_POST:
            return state.map(post =>
                (post.id === action.id)
                    ? { ...post, voteScore: action.vote === 'upvote' ? post.voteScore + 1 : post.voteScore - 1 }
                    : post
            )
        default:
            return state
    }
}

const comment = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return [
                ...state,
                {
                    id: uuidv4(),
                    parentId: action.parentId,
                    timestamp: Date.now(),
                    body: action.body,
                    author: action.author,
                    voteScore: 1,
                    deleted: false,
                    parentDeleted: false
                }
            ]
        case DELETE_COMMENT:
            return state.map(comment =>
                (comment.id === action.id)
                    ? { ...comment, deleted: true }
                    : comment
            )
        case EDIT_COMMENT:
            return state.map(comment =>
                (comment.id === action.id)
                    ? { ...comment, body: action.body, author: action.author }
                    : comment
            )
        case VOTE_COMMENT:
            return state.map(comment =>
                (comment.id === action.id)
                    ? { ...comment, voteScore: action.vote === 'upvote' ? comment.voteScore + 1 : comment.voteScore - 1 }
                    : comment
            )
        default:
            return state
    }
}

export default combineReducers({
    category,
    post,
    comment
})