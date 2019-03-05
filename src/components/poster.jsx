import React from "react"

const Poster = ({ movieData, onClick }) => (
  movieData.Poster !== 'N/A' && (
    <img src={movieData.Poster} alt={movieData.Title} onClick={onClick} />
  )
);

export default Poster;
