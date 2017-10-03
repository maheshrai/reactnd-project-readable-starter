import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Categories from './components/Categories'
import Posts from './components/Posts'
import ViewPost from './components/ViewPost'
import './App.css';

import { updatePostVote, fetchComments } from './actions'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <Route exact path="/:category" render={({ history, match }) => (
          <div>
            <h3>Posts</h3>
            <Posts posts={this.props.posts} category={match.params.category} onVote={this.props.onVote} />
          </div>
        )} />
        <Route exact path="/:category/:post_id" render={({ history, match }) => (
          <div>
            <h3>Post</h3>
            <ViewPost
              id={match.params.post_id}/>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div>
            <h3>Categories</h3>
            <Categories categories={this.props.categories} />
            <h3>Posts</h3>
            <Posts posts={this.props.posts} onVote={this.props.onVote} category='' />
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
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)
