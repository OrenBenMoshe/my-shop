import { useEffect, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/EditPost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const EditPost = () => {
  const { authorized, posts, setPosts } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [postID, setPostID] = useState(null);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("selectedPostID"));
    console.log("res: ", res);
    setPostID(res);
  }, []);

  useEffect(() => {
    if (postID) {
      const currentPost = posts.find((x) => x.id === postID);
      console.log(currentPost);
      setBody(currentPost.body);
      setName(currentPost.username);
    }
  }, [postID, posts]);

  const date = new Date();
  const hours = date.getHours() > 10 ? date.getHours() : "0" + date.getHours();
  const year = date.getFullYear();
  const currDate = date.getDate();
  const month = date.getMonth() + 1;
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const dateForm = `${currDate}/${month}/${year} ${hours}:${minutes}`;

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.length > 200) {
      alert("post can't contained more then 200 chars");
      setBody(
        "Please insert a post that  containing a maximum of 200 characters"
      );
      return;
    }
    setBody(input);
  };

  const handleSave = () => {
    const currentPost = posts.find((x) => x.id === postID);
    currentPost.body = body;
    currentPost.date = dateForm;
    setPosts((prevItems) => [...prevItems]);
    navigate("/posts");
  };

  const deletePost = () => {
    const deletePost = posts.findIndex((x) => x.id === postID);
    posts.splice(deletePost, 1);
    setPosts((prevItems) => [...prevItems]);
    navigate("/posts");
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <h3>{name}</h3>
      <textarea value={body} onChange={handleChange} autoFocus></textarea>
      <div className="post-btn-holder">
        <button className="save-btn" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} className="save-icon" />
        </button>
        <button className="delete-btn" onClick={deletePost}>
          <FontAwesomeIcon icon={faTrash} className="delete-icon" />
        </button>
        <button className="go-back-post" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faAngleRight} className="go-back-post-icon" />
        </button>
      </div>
    </div>
  );
};

export default EditPost;
