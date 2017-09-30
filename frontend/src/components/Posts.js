import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Posts extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Vote Score</th>
                    </tr>
                </thead>
                <tbody>
                    {this.findPostsByCategory().map((post, i) => <tr key={i}>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>{post.author}</td>
                        <td>{post.category}</td>
                        <td>{post.voteScore}</td>
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