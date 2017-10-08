import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import voteup from '../img/voteup.svg'
import votedown from '../img/votedown.svg'
import deleteImg from '../img/delete.svg'
import saveImg from '../img/save.svg'
import home from '../img/home.svg'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {
    updatePostVote, fetchComments, fetchPost,
    updateCommentVote, addNewPost, updatePost,
    addNewComment, delComment, updateComment, updateCommentCount
} from '../actions'
import Comments from './Comments'
const uuidv4 = require('uuid/v4')
class Post extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        loadPostComments: PropTypes.func.isRequired,
        onPostVote: PropTypes.func.isRequired,
        onCommentVote: PropTypes.func.isRequired,
        onDeletePost: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            category: this.props.category,
            id: this.props.id === 'new' ? uuidv4() : this.props.id,
            title: '',
            body: '',
            author: '',
            voteScore: 1,
            editingMode: this.props.id !== 'new',
            redirectHome: false,
            error: false,
            timestamp: new Date().getTime()
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deletePost = this.deletePost.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.title.trim() && this.state.author.trim() && this.state.body.trim()) {
            var savedPost = { ...this.state, timestamp: new Date().getTime() }
            delete savedPost.editingMode
            this.props.onAddPost(savedPost)
            this.setState({ editingMode: true, error: false })
        } else {
            this.setState({ error: true })
        }
    }

    updatePost() {
        this.props.onUpdatePost(this.state.id, this.state.title, this.state.body, this.state.author)
    }

    deletePost() {
        var c = window.confirm("Are you sure you want to delete the post?")
        if (c === true) {
            this.props.onDeletePost(this.state.id)
            this.setState({ redirectHome: true })
        }
    }

    componentDidMount() {
        if (this.state.editingMode) {
            this.props.loadPost(this.props.id)
            this.props.loadPostComments(this.props.id)
        } else {
            this.setState({
                title: '',
                body: '',
                author: '',
                id: uuidv4(),
                voteScore: 1
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
            this.setState({
                title: nextProps.post.title,
                body: nextProps.post.body,
                author: nextProps.post.author,
                voteScore: nextProps.post.voteScore,
                timestamp: nextProps.post.timestamp
            })
        }
    }

    render() {
        return (
            <div>
                <br />
                <NavLink to='/'>
                    <img src={home} height="20" width="20" alt="Home" title="Home" />
                </NavLink>
                <br />
                <span><b>Post</b>&nbsp;&nbsp;
                {this.state.editingMode && <button onClick={e => {
                        e.preventDefault()
                        this.props.onPostVote(this.props.id, 'upVote')
                    }}><img src={voteup} height="20" width="20" alt="Click to like the Post" /></button>}&nbsp;&nbsp;
                {this.state.editingMode && <button onClick={e => {
                        e.preventDefault()
                        this.props.onPostVote(this.props.id, 'downVote')
                    }}><img src={votedown} height="20" width="20" alt="Click if dislike the Post" /></button>}&nbsp;&nbsp;
                    {this.state.editingMode && <button onClick={e => {
                        e.preventDefault()
                        this.updatePost()
                    }}><img src={saveImg} height="20" width="20" alt="Click to save the Post" /></button>}
                    &nbsp;&nbsp;
                    {this.state.editingMode && <button onClick={e => {
                        e.preventDefault()
                        this.deletePost()
                    }}><img src={deleteImg} height="20" width="20" alt="Click to delete the Post" /></button>}
                </span>
                <h4>Category: <NavLink to={'/' + this.props.category}>{this.props.category}</NavLink></h4>
                {this.state.editingMode && <h4>Vote Score: {this.state.voteScore}</h4>}
                {this.state.editingMode && <h4>Timestamp: {new Date(this.state.timestamp).toLocaleString()}</h4>}
                {this.state.error && <span className="error">Title, Body and Author are required</span>}
                <form onSubmit={this.handleSubmit}>
                    <label>Title:
                    <input type="text" id="title" name="title" placeholder="Title"
                            value={this.state.title} onChange={this.handleInputChange} />
                    </label>
                    <label>Body:
                    <textarea rows="4" cols="50" id="body" name="body" placeholder="Body"
                            value={this.state.body} onChange={this.handleInputChange} />
                    </label>
                    <label>Author:
                    <input type="text" id="author" name="author" placeholder="Author"
                            value={this.state.author} onChange={this.handleInputChange} />
                    </label>
                    {!this.state.editingMode && <input type="submit" value="Save" />}
                </form>
                {this.state.redirectHome && (<Redirect to='/' />)}
                {this.state.editingMode && <Comments parentId={this.state.id}
                    comments={this.props.comments}
                    onCommentVote={this.props.onCommentVote}
                    onAddComment={this.props.onAddComment}
                    onDeleteComment={this.props.onDeleteComment}
                    onUpdateComment={this.props.onUpdateComment} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.post.posts ? state.post.posts[state.post.selectedIndex] : {},
    comments: state.comment.comments ? state.comment.comments : []
})

const mapDispatchToProps = dispatch => ({
    onPostVote: (postId, vote) => {
        dispatch(updatePostVote(postId, vote))
    },
    onCommentVote: (commentId, vote) => {
        dispatch(updateCommentVote(commentId, vote))
    },
    loadPost: id => {
        dispatch(fetchPost(id))
    },
    loadPostComments: id => {
        dispatch(fetchComments(id))
    },
    onAddPost: post => {
        dispatch(addNewPost(post))
    },
    onUpdatePost: (id, title, body, author) => {
        dispatch(updatePost(id, title, body, author))
    },
    onAddComment: comment => {
        dispatch(addNewComment(comment))
        dispatch(updateCommentCount(comment.parentId, 1, 'add'))
    },
    onDeleteComment: comment => {
        var c = window.confirm("Delete the comment?")
        if (c === true) {
            dispatch(delComment(comment.id))
            dispatch(updateCommentCount(comment.parentId, 1, 'del'))
        }
    },
    onUpdateComment: (id, body, author) => {
        dispatch(updateComment(id, body, author))
    }
})

export default connect(
    mapStateToProps, mapDispatchToProps, null, {
        pure: false
    }
)(Post)