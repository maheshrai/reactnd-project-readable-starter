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
export const COMMENT_COUNT = 'COMMENT_COUNT'

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
        .then(posts => {
            var postswithcnt = posts.map((p) => Object.assign({}, p, { commentCount: 0 }))
            dispatch(listPosts(postswithcnt))
        })
)

export const getPost = postId => ({
    type: GET_POST,
    postId
})

export const fetchPost = (postId) => dispatch => (
    ReadableAPI
        .getPost(postId)
        .then(post => dispatch(getPost(post.id)))
)

export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const addNewPost = (post) => dispatch => (
    ReadableAPI
        .addPost(post)
        .then(p => dispatch(addPost(Object.assign({}, p, { commentCount: 0 }))))
)

export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

export const updatePost = (id, title, body, author) => dispatch => (
    ReadableAPI
        .updatePost(id, title, body, author)
        .then(p => dispatch(editPost(p)))
)

export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}

export const delPost = (id) => dispatch => (
    ReadableAPI
        .deletePost(id)
        .then(p => dispatch(deletePost(p)))
)

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

export const updateCommentCount = (id, commentCount, actionType) => ({
    type: COMMENT_COUNT,
    id,
    commentCount,
    actionType
})

export const fetchAllComments = () => dispatch => (
    ReadableAPI
        .getAllPosts()
        .then(posts => {
            posts.forEach((p) => {
                ReadableAPI
                    .getPostComments(p.id)
                    .then(comments => dispatch(updateCommentCount(p.id, comments ? comments.length : 0, 'total')))
            })
        })
)

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const addNewComment = (comment) => dispatch => (
    ReadableAPI
        .addComment(comment)
        .then(c => dispatch(addComment(c)))
)

export const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

export const updateComment = (id, body, author) => dispatch => (
    ReadableAPI
        .updateComment(id, body, author)
        .then(c => dispatch(editComment(c)))
)

export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export const delComment = (id) => dispatch => (
    ReadableAPI
        .deleteComment(id)
        .then(c => dispatch(deleteComment(c)))
)

export const voteComment = (id, vote) => {
    return {
        type: VOTE_COMMENT,
        id,
        vote
    }
}

export const updateCommentVote = (commentId, vote) => dispatch => (
    ReadableAPI
        .updateCommentVote(commentId, vote)
        .then(dispatch(voteComment(commentId, vote)))
)

