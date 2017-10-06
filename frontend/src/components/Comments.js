import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../voteup.svg'
import votedown from '../votedown.svg'

class Comments extends Component {

    static propTypes = {
        comments: PropTypes.array.isRequired,
        onCommentVote: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <h3>Comments: {this.props.comments.length}</h3>
                <form>
                    <label>Comment:
                    <textarea rows="2" cols="50" id="comment" name="comment" placeholder="Comments" />
                    </label>
                    <label>Author:
                    <input type="text" id="comment_author" name="comment_author" placeholder="Author" />
                    </label>
                    <input type="button" value="Add Comment" />
                </form>
                {this.props.comments.map((comment, i) => <div key={comment.id} className="rcorners">
                    <button onClick={e => {
                        e.preventDefault()
                        this.props.onCommentVote(comment.id, 'upVote')
                    }}><img src={voteup} height="20" width="20" alt="Click to like the Comment" /></button>&nbsp;&nbsp;
                    <button onClick={e => {
                        e.preventDefault()
                        this.props.onCommentVote(comment.id, 'downVote')
                    }}><img src={votedown} height="20" width="20" alt="Click to dislike the Comment" /></button>
                    <br />
                    <span>{comment.body}</span>
                    <br />
                    <span>Author: {comment.author}</span>
                    <br />
                    <span>Vote Count: {comment.voteScore}</span>
                </div>
                )}
            </div>
        )
    }
}

export default Comments