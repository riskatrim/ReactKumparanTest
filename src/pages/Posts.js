import React, { Component, useState, useEffect } from "react";
import PostCards from "./components/PostCards";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Details from "./Details";
import Comments from "./Comments";

const Posts = () => {
  return (
    <>
      <div className="main">
        <PostCards />
        {/* <Details id={1} /> */}
        {/* <Comments id={1} /> */}
      </div>
    </>
  );
};

export default Posts;
