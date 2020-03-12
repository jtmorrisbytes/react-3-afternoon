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
        if (
          (response.data || {}).__proto__.contructor === [].__proto__.contructor
        ) {
          this.setState({ posts: response.data });
        } else {
          console.error(
            "App.getAllPosts: response.data was not an array... not calling setState now"
          );
        }
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
  updatePost(postId, text) {
    console.log("updatePost:", postId, text);
    axios
      .put(this.postsApi + `?id=${postId}`, { text })
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(console.error);
  }

  deletePost(postID) {
    console.log("delete post requested with id", postID);
    axios.delete(this.postsApi + `?id=${postID}`);
  }

  createPost() {}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />
          {posts.map((post, index) => {
            let text = (post.text || "").toString();
            return (
              <Post
                id={post.id}
                text={text}
                deletePostFn={this.deletePost}
                updatePostFn={this.updatePost}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
