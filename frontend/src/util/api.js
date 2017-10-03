
const api = "http://localhost:3001"


// Generate a unique token for connecting to api
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getPosts = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())
        .then(data => data)

export const getPost = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
    }).then(res => res.json())
        .then(data => data.post)

export const updatePostVote = (postId, vote) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: postId, option: vote })
    }).then(res => res.json())


export const updatePost = (postId, title, body) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    }).then(res => res.json())

export const getPostComments = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
