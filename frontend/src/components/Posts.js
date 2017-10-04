import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../voteup.svg';
import votedown from '../votedown.svg';
import deleteImg from '../delete.svg';
import { NavLink } from 'react-router-dom'

class Posts extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired,
        onVote: PropTypes.func.isRequired
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('nextProps', nextProps)
        console.log('nextState', nextState)
      }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Number of Comments</th>
                        <th>Vote Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.findPostsByCategory().map((post, i) => <tr key={i}>
                        <td><NavLink to={'/' + post.category + '/' + post.id}>{post.title}</NavLink></td>
                        <td>{post.author}</td>
                        <td>{post.voteScore}</td>
                        <td>{post.voteScore}</td>
                        <td>
                            <button onClick={e => {
                                e.preventDefault()
                                this.props.onVote(post.id, 'upVote')
                            }}><img src={voteup} height="20" width="20" alt="Click to like the Post" title="Click to like the Post" /></button>&nbsp;&nbsp;
                            <button onClick={e => {
                                e.preventDefault()
                                this.props.onVote(post.id, 'downVote')
                            }}><img src={votedown} height="20" width="20" alt="Click if dislike the Post" title="Click if dislike the Post" /></button>&nbsp;&nbsp;
                            <button onClick={e => {
                                e.preventDefault()
                                this.props.onVote(post.id, 'downVote')
                            }}><img src={deleteImg} height="20" width="20" alt="Click to delete the Post" title="Click to delete the Post" /></button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        )
    }

    findPostsByCategory = () => {
        if (!this.props.category) return this.props.posts;
        else return this.props.posts.filter(p => p.category === this.props.category)
    }
}

export default Posts