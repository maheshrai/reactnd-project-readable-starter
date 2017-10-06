import { combineReducers } from 'redux'

import {
    // category actions
    LIST_CATEGORIES,

    // Post actions
    LIST_POSTS,
    GET_POST,
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    VOTE_POST,

    // Comment actions
    LIST_COMMENTS,
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    VOTE_COMMENT
} from '../actions'

const uuidv4 = require('uuid/v4')

const category = (state = {}, action) => {
    switch (action.type) {
        case LIST_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories,
            })
        default:
            return state
    }
}

const post = (state = {}, action) => {
    switch (action.type) {
        case LIST_POSTS:
            return Object.assign({}, state, {
                posts: action.posts,
                selectedIndex: -1
            })
        case GET_POST:
            return Object.assign({}, state, {
                selectedIndex: state.posts.findIndex(p => p.id === action.postId)
            })
        case ADD_POST:
            return Object.assign({}, state, {
                posts: [...state.posts, action.post]
            })
        case DELETE_POST:
            return Object.assign({}, state, {
                posts: state.posts.filter(p => p.id !== action.post.id),
                selectedIndex: -1
            })
        case EDIT_POST:
            console.log('>>>>>>>', action.post)
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.post.id) {
                        return { ...action.post }
                    }
                    return post
                })
            })
        case VOTE_POST:
            return Object.assign({}, state, {
                posts: state.posts.map((post) => {
                    if (post.id === action.id) {
                        return Object.assign({}, post, {
                            voteScore: action.vote === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
                        })
                    }
                    return post
                })
            })
        default:
            return state
    }
}

const comment = (state = {}, action) => {
    switch (action.type) {
        case LIST_COMMENTS:
            return Object.assign({}, state, {
                comments: action.comments,
            })
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
            return Object.assign({}, state, {
                comments: state.comments.map((comment) => {
                    if (comment.id === action.id) {
                        return Object.assign({}, comment, {
                            voteScore: action.vote === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1
                        })
                    }
                    return comment
                })
            })
        default:
            return state
    }
}

export default combineReducers({
    category,
    post,
    comment
})