import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Categories from './components/Categories'
import Posts from './components/Posts'
import Post from './components/Post'
import home from './img/home.svg'
import './App.css';

import { updatePostVote, fetchComments, delPost } from './actions'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <Route exact path="/:category" render={({ history, match }) => (
          <div>
            <br/>
            <NavLink to='/'>
              <img src={home} height="20" width="20" alt="Home" title="Home" />
            </NavLink>
            <h4>Category: {match.params.category}</h4>
            <h3>Posts</h3>
            <Posts posts={this.props.posts} category={match.params.category} onVote={this.props.onVote} />
          </div>
        )} />
        <Route exact path="/:category/:post_id" render={({ history, match }) => (
          <div>
            <Post id={match.params.post_id}
              category={match.params.category}
              onDeletePost={this.props.onDeletePost} />
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div>
            <h3>Categories</h3>
            <Categories categories={this.props.categories} />
            <h3>Posts</h3>
            <Posts posts={this.props.posts} onVote={this.props.onVote} onDeletePost={this.props.onDeletePost} category='' />
          </div>
        )} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.category.categories ? state.category.categories : [],
  posts: state.post.posts ? state.post.posts : []
})

const mapDispatchToProps = dispatch => {
  return {
    onVote: (id, vote) => {
      dispatch(updatePostVote(id, vote))
    },
    loadPostComments: id => {
      dispatch(fetchComments(id))
    },
    onDeletePost: id => {
      dispatch(delPost(id))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps, null, {
    pure: false
  }
)(App)
