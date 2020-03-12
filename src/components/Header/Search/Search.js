import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            onChange={this.props.handleFilterChangeFn}
            placeholder="Search Your Feed"
            value={this.props.postsFilter}
          />

          <SearchIcon id="Search__icon" />
        </div>
      </section>
    );
  }
}
