import React, { Component, useState, useEffect } from "react";
// import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import PostCards from "./components/PostCards";

const Comments = ({ id }) => {
  const [img, setImg] = useState({});
  const [comments, setComments] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(async () => {
    const resultsComment = await axios(
      "https://jsonplaceholder.typicode.com/comments/"
    );
    const resultsImg = await axios(
      "https://jsonplaceholder.typicode.com/photos/" + id
    );

    setComments(resultsComment.data.slice(1 + (id - 1) * 5 - 1, id * 5));
    setImg(resultsImg.data);
    setisLoading(false);
  }, []);

  const inputStyle = {
    width: "100%",
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <input
          className="card-subtitle m-2 text-muted"
          placeholder="input yout text here"
          style={inputStyle}
        ></input>
        <a href={<PostCards />} className="btn btn-primary">
          Submit
        </a>
      </div>
      {isLoading
        ? "loading..."
        : comments.map((comment, index) => (
            <Comment comment={comment} img={img.url} />
          ))}
    </div>
  );
};
const Comment = ({ comment, img }) => {
  const imgStyle = {
    height: "100%",
  };

  return (
    <div className="container">
      <div className="card-body container d-flex flex-row mb-2"></div>
      <div className="card card-body container d-flex flex-row mb-2">
        <div className="d-flex flex-row">
          <img
            src={img}
            className="rounded-circle mr-3 col-1"
            style={imgStyle}
            alt="card image"
          />
          <div className="d-flex flex-column mb-2 col-11">
            <p className="card-subtitle mb-2 text-muted">{comment.name}</p>
            <p className="card-text">{comment.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
