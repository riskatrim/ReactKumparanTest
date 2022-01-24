import React, { Component, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Details from "../Details.js";
import axios from "axios";
import { Link } from "react-router-dom";

const PostCards = () => {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      const resultsImg = await axios(
        "https://jsonplaceholder.typicode.com/photos/"
      );
      const resultsUser = await axios(
        "https://jsonplaceholder.typicode.com/users/"
      );

      setUsers(resultsUser.data);
      setImages(resultsImg.data);
      setPosts(results.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {posts.map((post, index) => (
        <PostCard
          key={index}
          post={post}
          img={images[index].url}
          user={users[index % 10]}
          id={index + 1}
        />
      ))}
    </div>
  );
};

const PostCard = ({ img, post, user, id }) => {
  const imgStyle = {
    width: 200,
  };
  return (
    <div className="card d-flex flex-row-reverse mb-4">
      <img
        src={img}
        className="card-img-top"
        style={imgStyle}
        alt="card image"
      />
      <div className="card-body">
        <h5 className="card-title font-weight-bold">{post.title}</h5>
        <p className="card-subtitle mb-2 text-muted">
          {user.username} | {user.company.name}
        </p>
        <p className="card-text">{post.body}</p>
        <Link to={"details/" + id} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCards;
