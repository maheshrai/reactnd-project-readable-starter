import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../img/voteup.svg'
import votedown from '../img/votedown.svg'
import addImg from '../img/add.svg'
import deleteImg from '../img/delete.svg'
import editImg from '../img/edit.svg'
import Modal from 'react-modal'
const uuidv4 = require('uuid/v4')

class Comments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            body: '',
            author: '',
            parentId: this.props.parentId,
            modalIsOpen: false,
            editMode: false,
            error: false
        }

        this.addComment = this.addComment.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editComment = this.editComment.bind(this)
    }

    addComment() {
        this.setState({ id: uuidv4(), body: '', author: '', modalIsOpen: true, editMode: false })
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    editComment(comment) {
        this.setState({ id: comment.id, body: comment.body, author: comment.author, modalIsOpen: true, editMode: true })
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
        if (this.state.body.trim() && this.state.author.trim()) {
            var savedComment = { ...this.state, timestamp: new Date().getTime() }
            if (this.state.editMode) {
                this.props.onUpdateComment(savedComment.id, savedComment.body, savedComment.author)
            } else {
                this.props.onAddComment(savedComment)
            }
            this.setState({ error: false })
            this.closeModal()
        } else {
            this.setState({ error: true })
        }
    }

    static propTypes = {
        comments: PropTypes.array.isRequired,
        onCommentVote: PropTypes.func.isRequired,
        onAddComment: PropTypes.func.isRequired,
        onDeleteComment: PropTypes.func.isRequired,
        onUpdateComment: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <h3>Comments: {this.props.comments.length}&nbsp;&nbsp;
                    <button onClick={this.addComment} >
                        <img src={addImg} height="20" width="20" title="Click to add Comment" alt="Add Comment" />
                    </button>
                </h3>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Comment">
                    {this.state.error && <span className="error">Body and Author are required</span>}
                    <form onSubmit={this.handleSubmit}>
                        <label>Comment:
                    <textarea rows="4" cols="50" id="body" name="body" placeholder="Comments"
                                value={this.state.body} onChange={this.handleInputChange} />
                        </label>
                        <label>Author:
                    <input type="text" id="author" name="author" placeholder="Author"
                                value={this.state.author} onChange={this.handleInputChange} />
                        </label>
                        <input type="submit" value="Save" />
                    </form>
                </Modal>
                {this.props.comments.map((comment, i) => <div key={comment.id}><div className="rcorners">
                    <button onClick={e => {
                        e.preventDefault()
                        this.props.onCommentVote(comment.id, 'upVote')
                    }}><img src={voteup} height="20" width="20" alt="Click to like the Comment" title="Like" /></button>&nbsp;&nbsp;
                    <button onClick={e => {
                        e.preventDefault()
                        this.props.onCommentVote(comment.id, 'downVote')
                    }}><img src={votedown} height="20" width="20" alt="Click to dislike the Comment" title="Dislike" /></button>&nbsp;&nbsp;
                    <button onClick={e => {
                        e.preventDefault()
                        this.editComment(comment)
                    }}><img src={editImg} height="20" width="20" alt="Click to edit the Comment" title="Edit" /></button>&nbsp;&nbsp;
                    <button onClick={e => {
                        e.preventDefault()
                        this.props.onDeleteComment(comment)
                    }}><img src={deleteImg} height="20" width="20" alt="Click to delete the Comment" title="Delete" /></button>
                    <br /><br />
                    <span>{comment.body}</span>
                    <br />
                    <span>Author: {comment.author}</span>
                    <br />
                    <span>Vote Count: {comment.voteScore}</span>
                </div><br /></div>
                )}
            </div>
        )
    }
}

export default Comments