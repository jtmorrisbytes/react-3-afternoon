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
    this.postsApi = "https://practiceapi.devmountain.com/api/posts";
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }
  getAllPosts() {
    axios
      .get(this.postsApi)
      .then(response => {
        console.log("GetAllPosts response data", response.data);
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.getAllPosts();
  }

  updatePost() {}

  deletePost() {}

  createPost() {}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />
          {this.state.posts.map((post, index) => {
            return <Post key={index} />;
          })}
        </section>
      </div>
    );
  }
}

export default App;
