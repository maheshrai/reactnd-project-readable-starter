import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../voteup.svg'
import votedown from '../votedown.svg'
import { connect } from 'react-redux'
import { updatePostVote, fetchComments, fetchPost } from '../actions'
import Comments from './Comments'

class ViewPost extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        loadPostComments: PropTypes.func.isRequired,
        onVote: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.loadPost(this.props.id)
        this.props.loadPostComments(this.props.id)
    }

    render() {
        return (
            <div>
                <button onClick={e => {
                    e.preventDefault()
                    this.props.onVote(this.props.id, 'upVote')
                }}><img src={voteup} height="20" width="20" alt="Click to like the Post" /></button>&nbsp;&nbsp;
                <button onClick={e => {
                    e.preventDefault()
                    this.props.onVote(this.props.id, 'downVote')
                }}><img src={votedown} height="20" width="20" alt="Click if dislike the Post" /></button>
                <form>
                    <label>Title:
                    <input type="text" id="title" name="title" placeholder="Title" value={this.props.post ? this.props.post.title : ''} />
                    </label>
                    <label>Body:
                    <textarea rows="4" cols="50" id="body" name="body" placeholder="Body" value={this.props.post ? this.props.post.body : ''}/>
                    </label>
                    <label>Author:
                    <input type="text" id="author" name="author" placeholder="Author" value={this.props.post ? this.props.post.author : ''}/>
                    </label>
                    <label>Vote Score:
                    <input type="text" id="voteScore" name="voteScore" readOnly value={this.props.post ? this.props.post.voteScore : ''}/>
                    </label>
                    <input type="button" value="Save" />
                    <input type="button" value="Delete" />
                    <input type="button" value="Add Comment" />
                </form>
                <Comments comments={this.props.comments} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.post.selectedPost,
    comments: state.comment.comments ? state.comment.comments : []
})

const mapDispatchToProps = dispatch => ({
    onVote: (id, vote) => {
        dispatch(updatePostVote(id, vote))
    },
    loadPost: id => {
        dispatch(fetchPost(id))
    },
    loadPostComments: id => {
        dispatch(fetchComments(id))
    }
})

export default connect(
    mapStateToProps, mapDispatchToProps
)(ViewPost)