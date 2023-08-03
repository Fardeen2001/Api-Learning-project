import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryIntervalId, setretryIntervalId] = useState(null);
  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
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
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      const intervalId = setInterval(fetchMovieHandler, 5000);
      setretryIntervalId(intervalId);
    }
  };
  const handleCancelRetry = () => {
    setError(null);
    setIsLoading(false);
    clearInterval(retryIntervalId);
    setretryIntervalId(null);
  };
  useEffect(() => {
    fetchMovieHandler();
  }, []);

  let content = <h2>No Movies Found</h2>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <div>
        {" "}
        <h2>{error}</h2>
        {retryIntervalId && <button onClick={handleCancelRetry}>Cancel</button>}
      </div>
    );
  }
  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
