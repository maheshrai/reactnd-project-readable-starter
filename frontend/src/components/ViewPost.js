import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../voteup.svg'
import votedown from '../votedown.svg'
import { connect } from 'react-redux'
import { updatePostVote, fetchComments } from '../actions'
import Comments from './Comments'

class ViewPost extends Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        comments: PropTypes.array.isRequired,
        loadPostComments: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.loadPostComments(this.props.id);
    }

    render() {
        return (
            <div>
                <button><img src={voteup} height="20" width="20" alt="Click to like the Post" /></button>&nbsp;&nbsp;
                <button><img src={votedown} height="20" width="20" alt="Click if dislike the Post" /></button>
                <form>
                    <label>Title:
                    <input type="text" id="title" name="title" placeholder="Title" />
                    </label>
                    <label>Body:
                    <textarea rows="4" cols="50" id="body" name="body" placeholder="Body" />
                    </label>
                    <label>Author:
                    <input type="text" id="author" name="author" placeholder="Author" />
                    </label>
                    <label>Vote Score:
                    <input type="text" id="voteScore" name="voteScore" readOnly />
                    </label>
                    <input type="button" value="Save" />
                    <input type="button" value="Delete" />
                </form>
                <Comments comments={this.props.comments} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    comments: state.comment.comments ? state.comment.comments : []
})

const mapDispatchToProps = dispatch => {
    return {
        onVote: (id, vote) => {
            dispatch(updatePostVote(id, vote))
        },
        loadPostComments: id => {
            dispatch(fetchComments(id))
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ViewPost)