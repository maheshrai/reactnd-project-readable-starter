import React, { Component } from 'react'
import PropTypes from 'prop-types'
import voteup from '../img/voteup.svg'
import votedown from '../img/votedown.svg'
import deleteImg from '../img/delete.svg'
import { NavLink } from 'react-router-dom'

class Posts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sort: '',
            sortField: ''
        }

        this.sort = this.sort.bind(this)
    }

    static propTypes = {
        posts: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired,
        onVote: PropTypes.func.isRequired,
        onDeletePost: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.setState({ posts: this.findPostsByCategory() })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ posts: this.findPostsByCategory() })
    }

    deletePost(id) {
        var c = window.confirm("Are you sure you want to delete the post?")
        if (c === true) {
            this.props.onDeletePost(id)
        }
    }

    sort(field) {
        var sposts, sortby = 'asc'
        if (field === this.state.sortField) sortby = this.state.sortby === 'asc' ? 'desc' : 'asc'
        if (field === 'title' || field === 'author') {
            sposts = this.props.posts.sort((a, b) => sortby === 'asc' ?
                a[field].toLowerCase() > b[field].toLowerCase() :
                a[field].toLowerCase() < b[field].toLowerCase())
        } else {
            sposts = this.props.posts.sort((a, b) => sortby === 'asc' ? a[field] > b[field] : a[field] < b[field])
        }
        this.setState({ posts: sposts, sortField: field, sortby: sortby })
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th><a href="#" onClick={() => { this.sort('title') }}>Title</a></th>
                        <th><a href="#" onClick={() => { this.sort('author') }}>Author</a></th>
                        <th><a href="#" onClick={() => { this.sort('timestamp') }}>Timestamp</a></th>
                        <th><a href="#" onClick={() => { this.sort('commentCount') }}>Number of Comments</a></th>
                        <th><a href="#" onClick={() => { this.sort('voteScore') }}>Vote Score</a></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.findPostsByCategory().map((post, i) => <tr key={i}>
                        <td><NavLink to={'/' + post.category + '/' + post.id}>{post.title}</NavLink></td>
                        <td>{post.author}</td>
                        <td>{new Date(post.timestamp).toLocaleString()}</td>
                        <td>{post.commentCount}</td>
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
                                this.deletePost(post.id)
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