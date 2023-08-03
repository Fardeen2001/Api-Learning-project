import React from "react";
import { useState } from "react";

const InputForm = (props) => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [date, SetDate] = useState("");
  const titleChangeHandler = (e) => {
    setTitle(e.targget.value);
  };
  const openingTextChangeHandler = (e) => {
    setOpeningText(e.target.value);
  };
  const ReleaseDateTextChangeHandler = (e) => {
    SetDate(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      openingText: openingText,
      releaseDate: date,
    };
    props.onAddMovie(data);
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="Title">Title</label>
      <br />
      <input
        type="text"
        name="Title"
        id="Title"
        onChange={titleChangeHandler}
      />
      <br />
      <label htmlFor="openingText">openingText</label>
      <br />
      <textarea
        name="openingText"
        id="openingText"
        cols="30"
        rows="5"
        onChange={openingTextChangeHandler}
      ></textarea>
      <br />
      <label htmlFor="ReleaseDate">ReleaseDate</label>
      <br />
      <input
        type="date"
        name="ReleaseDate"
        id="ReleaseDate"
        onChange={ReleaseDateTextChangeHandler}
      />
      <br />
      <button>Add Movies</button>
    </form>
  );
};

export default InputForm;
