import React from "react";
import { connect } from "react-redux";

import "../styles/searchBar.css";


let SearchBar = ({ onChange, item }) => {
  let input = item;

  return (
    <div className="searchBar-wrapper">
      <p>Search for an Artist, Song or Album</p>
      <form
        onChange={e => {
          // **X**
          e.preventDefault();
          onChange(input.value);
        }}
      >
        <input
          autoFocus
          defaultValue={item}
          placeholder="Typing"
          ref={node => {
            input = node;
          }}
        />
      </form>
    </div>
  );
};

/* const mapStateToProps = state => ({
  token: state.token.token
});

const mapDispatchToProps = dispatch => ({
  getTracks: (item, token) => dispatch(fetchTracks(item, token))
}); */

// Connects a React component to a Redux store.
SearchBar = connect()(SearchBar);

export default SearchBar;
