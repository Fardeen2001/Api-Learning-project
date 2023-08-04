import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import InputForm from "./components/inputMovies/inputForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryIntervalId, setretryIntervalId] = useState(null);
  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-movie-project-47b7c-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setIsLoading(false);
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      const intervalId = setInterval(fetchMovieHandler, 5000);
      setretryIntervalId(intervalId);
    }
  }, []);
  const handleCancelRetry = () => {
    setError(null);
    setIsLoading(false);
    clearInterval(retryIntervalId);
    setretryIntervalId(null);
  };
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-movie-project-47b7c-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

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
        <InputForm onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
