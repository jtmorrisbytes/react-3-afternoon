import React, { Component } from "react";

import "./App.css";
import axios from "axios";
import Post from "./Post/Post";
import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };
    this.updateInterval;
    this.postsApi = "https://practiceapi.devmountain.com/api/posts";
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
  }
  getAllPosts() {
    axios
      .get(this.postsApi)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getAllPosts();

    this.updateInterval = setInterval(this.getAllPosts, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
  updatePost(text) {}

  deletePost() {}

  createPost() {}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />
          {posts.map((post, index) => {
            return (
              <Post
                {...post}
                key={index}
                postsApi={this.postsApi}
                updatePost={this.props.updatePost}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
