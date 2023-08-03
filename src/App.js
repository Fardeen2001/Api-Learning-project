import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovieHandler = async () => {
    setIsLoading(true);

    const response = await fetch("https://swapi.py4e.com/api/films/");
    const data = await response.json();
    setTimeout(() => {
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setIsLoading(false);
      setMovies(transformedData);
    }, 1000);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h1>Loading....</h1>}
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && <h2>No Movies Found</h2>}
      </section>
    </React.Fragment>
  );
}

export default App;
