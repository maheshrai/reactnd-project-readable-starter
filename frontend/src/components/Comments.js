import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../voteup.svg'
import votedown from '../votedown.svg'

class Comments extends Component {

    static propTypes = {
        comments: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                <h3>Comments: {this.props.comments.length}</h3>
                {this.props.comments.map((comment, i) => <div><br /><div key={comment.id} className="rcorners">
                    <button><img src={voteup} height="20" width="20" alt="Click to like the Comment" /></button>&nbsp;&nbsp;
                    <button><img src={votedown} height="20" width="20" alt="Click to dislike the Comment" /></button>
                    <br />
                    <span>{comment.body}</span>
                    <br />
                    <span>Author: {comment.author}</span>
                    <br />
                    <span>Vote Count: {comment.voteScore}</span>
                </div></div>
                )}
            </div>
        )
    }
}

export default Comments