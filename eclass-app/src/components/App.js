import React, { Component } from "react";
import SearchBar from "../containers/SearchBar";
import Navbar from "./Navbar";
import PageWrapper from "../containers/PageWrapper";
import { searchItem, selectPage, fetchData, saveToken } from "../actions";
import { connect } from "react-redux";

import "../styles/app.css";

class App extends Component {
  componentWillMount() {
    const getHashParams = () => {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      e = r.exec(q);
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
      }
      return hashParams;
    };
    const params = getHashParams();
    const token = params.access_token;
    this.props.saveToken(token);
    console.log(params);
  }

  componentDidMount() {
    const { item, token } = this.props;
    if (item === "") return; // Avoid initial fetch for no data.
    this.props.fetchData(item, token);
  }
  componentWillReceiveProps(nextProps) {
    console.log("SOY NEXTPROPS:", nextProps);
    if (nextProps.item.length === 0) {
      if (this.props.item.length >= 1) {
        this.props.history("top-results/");
      }
      return;
    } else {
      if (nextProps.item !== this.props.item) {
        const { item, token } = nextProps;
        this.props.fetchData(item, token);
      }
    }
  }

  handleSearchBarChange = nextItem => {
    this.props.searchItem(nextItem);
  };

  handlePageChange = nextPage => {
    console.log(nextPage);
    this.props.selectPage(nextPage);
  };

  render() {
    const { item, page, isFetching, itemData, ownProps } = this.props;
    let isEmpty = itemData.length === 0;
    return (
      <div>
        <SearchBar onChange={this.handleSearchBarChange} item={item} />
        {isFetching && item === "" ? (
          ""
        ) : (
          <Navbar onClick={this.handlePageChange} ownProps={ownProps} />
        )}
        {isEmpty ? (
          isFetching ? (
            item === "" ? (
              <Info />
            ) : (
              <h4>Loading...</h4>
            )
          ) : (
            <h4>Empty.</h4>
          )
        ) : (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <PageWrapper page={page} itemData={itemData} />
          </div>
        )}
      </div>
    );
  }
}

const Info = () => (
  <div className="info">
    <h4>SpotifyReact/Redux.</h4>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  console.log("soy ownProps", ownProps);
  let { item, page, spotifyApp, token } = state;
  // 2-way binding with rr-v4.
  // @item: Get the item from the search bar, if none, take it from the url, '' as fallback.
  page = ownProps.match.params.page || page;
  item = item || ownProps.match.params.item || "";

  const { isFetching, items: itemData } = spotifyApp[item] || {
    isFetching: true,
    items: []
  };

  return {
    page,
    item,
    itemData,
    isFetching,
    ownProps,
    token
  };
};

const mapDispatchToProps = dispatch => ({
  selectPage: value => dispatch(selectPage(value)),
  fetchData: (item, token) => dispatch(fetchData(item, token)),
  saveToken: token => dispatch(saveToken(token)),
  searchItem: searchValue => dispatch(searchItem(searchValue))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

