import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import "../styles/Posts.css";

const PostItem = (props) => {
  const { editPost } = props;
  const { username, body, date } = props.item;
  const { user } = useContext(UserContext);
  return (
    <div className="post-item">
      <div className="post-header">
        <FontAwesomeIcon icon={faUser} className="post-user-icon" />
        <p className="post-name">({username}) :</p>
      </div>
      <span className="body-post">{body} </span>
      <br />
      <div>
        <p>{date}</p>
        <button
          onClick={() => editPost(props.item)}
          style={{ display: username === user ? "block" : "none" }}
        >
          <FontAwesomeIcon icon={faPen} className="pen-icon" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default PostItem;
