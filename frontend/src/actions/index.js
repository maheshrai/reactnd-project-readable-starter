import * as ReadableAPI from '../util/api'

//  Category Actions
export const LIST_CATEGORIES = 'LIST_CATEGORIES'

// Post Actions
export const LIST_POSTS = 'LIST_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

// Comment Actions
export const LIST_COMMENTS = 'LIST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const listCategories = categories => ({
    type: LIST_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    ReadableAPI
        .getCategories()
        .then(categories => dispatch(listCategories(categories)))
)

export const listPosts = posts => ({
    type: LIST_POSTS,
    posts
})

export const fetchPosts = () => dispatch => (
    ReadableAPI
        .getAllPosts()
        .then(posts => dispatch(listPosts(posts)))
)

export const addPost = (category, title, body, author) => {
    return {
        type: ADD_POST,
        category,
        title,
        body,
        author
    }
}

export const editPost = (id, title, body, author) => {
    return {
        type: EDIT_POST,
        id,
        title,
        body,
        author
    }
}

export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

export const votePost = (id, vote) => {
    return {
        type: VOTE_POST,
        id,
        vote
    }
}

export const updatePostVote = (id, vote) => dispatch => (
    ReadableAPI
        .updatePostVote(id, vote)
        .then(dispatch(votePost(id, vote)))
)

export const listComments = comments => ({
    type: LIST_COMMENTS,
    comments
})

export const fetchComments = (postId) => dispatch => (
    ReadableAPI
        .getPostComments(postId)
        .then(comments => dispatch(listComments(comments)))
)

export const getPost = post => ({
    type: GET_POST,
    post
})

export const fetchPost = (postId) => dispatch => (
    ReadableAPI
        .getPost(postId)
        .then(post => dispatch(getPost(post)))
)

export const addComment = (parentId, body, author) => {
    return {
        type: ADD_COMMENT,
        parentId,
        body,
        author
    }
}

export const editComment = (id, title, body, author) => {
    return {
        type: EDIT_COMMENT,
        id,
        title,
        body,
        author
    }
}

export const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}

export const voteComment = (id, vote) => {
    return {
        type: VOTE_COMMENT,
        id,
        vote
    }
}

