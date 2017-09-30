import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Categories from './components/Categories'
import Posts from './components/Posts'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <Route path="/:category" render={({ history, match }) => (
          <div>
            <h3>Posts</h3>
            <Posts posts={this.props.posts} category={match.params.category}/>
          </div>
        )} />
        <Route exact path='/' render={() => (
          <div>
            <h3>Categories</h3>
            <Categories categories={this.props.categories} />
            <h3>Posts</h3>
            <Posts posts={this.props.posts} />
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

export default connect(
  mapStateToProps
)(App)
