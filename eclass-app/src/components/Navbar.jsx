import React from "react";
import FilterLink from "../containers/FilterLink";
import { withRouter } from "react-router-dom";

import "../styles/navbar.css";

const Navbar = ({ onClick, subPage, page }) => (
  <div className="navbar-wrapper">
    <li>
      <FilterLink
        page="top-results"
        onClick={onClick}
        subPage={subPage}
        page={page}
      >
        Top Results
      </FilterLink>
    </li>
    <li>
      <FilterLink
        page="artists"
        onClick={onClick}
        subPage={subPage}
        page={page}
      >
        Artists
      </FilterLink>
    </li>
    <li>
      <FilterLink page="tracks" onClick={onClick} subPage={subPage} page={page}>
        Tracks
      </FilterLink>
    </li>
    <li>
      <FilterLink page="albums" onClick={onClick} subPage={subPage} page={page}>
        Albums
      </FilterLink>
    </li>
  </div>
);

export default withRouter(Navbar);
