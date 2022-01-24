import React, { Component, useState, useEffect } from "react";
// import "./style.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import PostCards from "./components/PostCards";
// import Comment from "./comment";
import Quotes from "./components/quotes.png";
import { useParams, useQuery } from "react-router-dom";
import { Link } from "react-router-dom";
import Comments from "./Comments";

const Details = () => {
  const [post, setPost] = useState({});
  const [img, setImg] = useState({});
  const [user, setUser] = useState({});
  const [isComment, setIsComment] = useState(false);
  const param = useParams();

  const id = param.id;
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      const resultsImg = await axios(
        "https://jsonplaceholder.typicode.com/photos/" + id
      );
      const resultsUser = await axios(
        "https://jsonplaceholder.typicode.com/users/" + (id % 10)
      );

      setUser(resultsUser.data);
      setImg(resultsImg.data);
      setPost(results.data);
    };
    fetchData();
  }, []);

  const imgStyle = {
    width: "500px",
  };

  const commentStyle = {
    width: "20px",
  };

  const toggleComment = () => {
    if (isComment) {
      setIsComment(false);
    } else {
      setIsComment(true);
    }
  };

  return (
    <>
      <div className="card mb-4">
        <img
          src={img.url}
          className="card-img-top"
          style={imgStyle}
          alt="card image"
        />
        <div className="card-body container">
          <h5 className="card-title font-weight-bold">{post.title}</h5>
          <p className="card-subtitle mb-2 text-muted">{user.username}</p>
          <br />
          <p className="card-text">{post.body}</p>
          <br />
          <div className="d-flex flex-row-reverse justify-content-between">
            <Link to="/" className="btn btn-primary">
              Back
            </Link>
            <button className="btn  btn-info" onClick={toggleComment}>
              <img src={Quotes} style={commentStyle} /> (5)
            </button>
          </div>
        </div>
      </div>
      {isComment ? <Comments id={id} /> : ""}
    </>
  );
};

export default Details;
