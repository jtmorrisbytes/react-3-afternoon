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
      posts: [],
      postsFilter: ""
    };
    this.updateInterval;
    this.postsApi = "https://practiceapi.devmountain.com/api/posts";
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  getPosts() {
    let requestUrl = this.postsApi;
    if (this.state.postsFilter.length > 0) {
      requestUrl += `/filter?text=${this.state.postsFilter}`;
    }

    axios
      .get(requestUrl)
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
  handleFilterChange(event) {
    console.log("somebody typed in the search box", event);
    this.setState({ postsFilter: event.target.value });
  }
  componentDidMount() {
    this.getPosts();

    this.updateInterval = setInterval(this.getPosts, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }
  updatePost(postId, text) {
    axios
      .put(this.postsApi + `?id=${postId}`, { text })
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(console.error);
  }

  deletePost(postID) {
    axios
      .delete(this.postsApi + `?id=${postID}`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(console.error);
  }

  createPost(text) {
    axios.post(this.postsApi, { text }).then(response => {
      this.setState({ posts: response.data });
    });
  }
  filterPosts(text = this.state.postsFilter) {
    axios
      .get(this.postsApi + `/filter?text=${text || ""}`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(console.error);
  }
  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header
          filterPostsFn={this.filterPosts}
          postsFilter={this.state.postsFilter}
          handleFilterChangeFn={this.handleFilterChange}
        />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
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
