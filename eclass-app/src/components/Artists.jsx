import React from "react";

import "../styles/artists.css";
import artistImg from "../images/artist-music.jpg";

const Artists = ({ itemData, maxItem = 20 }) => (
  <div className="artists-wrapper">
    {itemData.artists.map((artist, i) =>
      i >= maxItem ? (
        ""
      ) : (
        <div key={artist.id} className="artist">
          <img
            alt={artist.name}
            src={artist.image === undefined ? artistImg : artist.image.url}
          />
          <p>{artist.name}</p>
        </div>
      )
    )}
  </div>
);

export default Artists;