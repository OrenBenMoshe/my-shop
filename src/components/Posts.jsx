import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Posts.css";
import PostItem from "./PostItem";
import { v4 as uuidv4 } from "uuid";

const Posts = () => {
  const { authorized, user, posts, setPosts } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const [userPost, setUserPost] = useState("");
  const date = new Date();
  const hours = date.getHours() > 10 ? date.getHours() : "0" + date.getHours();
  const year = date.getFullYear();
  const currDate = date.getDate();
  const month = date.getMonth() + 1;
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const dateForm = `${currDate}/${month}/${year} ${hours}:${minutes}`;

  const editPost = (item) => {
    localStorage.setItem("selectedPostID", JSON.stringify(item.id));
    navigate("/EditPost");
  };

  const createPostItem = (item, index) => {
    return <PostItem key={index} item={item} editPost={editPost} />;
  };

  const handlePost = (event) => {
    const value = event.target.value;
    if (value.length > 200) {
      alert("post can't contained more then 200 chars");
      setUserPost(
        "Please insert a post that  containing a maximum of 200 characters"
      );
      return;
    }
    setUserPost(value);
  };

  const savePost = (event) => {
    event.preventDefault();
    const postObject = {
      id: uuidv4(),
      username: user,
      body: userPost,
      date: dateForm,
    };
    setPosts((prevItems) => [...prevItems, postObject]);
    setUserPost("");
  };

  return (
    <div className="post-page">
      <form className="input-post">
        <label htmlFor="post-body">Enter you post: </label>
        <textarea
          id="post-body"
          value={userPost}
          onChange={handlePost}
        ></textarea>
        <button className="save-post" onClick={savePost}>
          send
        </button>
      </form>
      <h1>Users Posts</h1>
      <div className="posts-container">{posts.map(createPostItem)}</div>
    </div>
  );
};

export default Posts;
