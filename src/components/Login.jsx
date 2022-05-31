import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  console.log("render Login.jsx");
  const { authorized, usersList, setAuthorized, setUser } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) navigate("/Home");
  }, [authorized, navigate]);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const loginUser = (event) => {
    event.preventDefault();
    const currentUser = usersList.find(
      (user) => user.username === formData.username
    );
    console.log(currentUser);
    if (currentUser) {
      if (currentUser.password !== formData.password) {
        setPasswordMatch(true);
        setUserExist(false);
      } else {
        setUser(currentUser.username);
        setAuthorized(true);
        navigate("/Home");
      }
    } else {
      setUserExist(true);
      setPasswordMatch(false);
    }
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLogin = (event) => {
    const id = event.target.id;
    const userInput = event.target.value.replace(/\s+/g, "");
    switch (id) {
      case "username":
        setFormData({ ...formData, username: userInput });
        break;
      case "password":
        setFormData({ ...formData, password: userInput });
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginUser}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          onChange={handleLogin}
          required
          value={formData.username}
          autoComplete="off"
          autoFocus
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          onChange={handleLogin}
          required
          value={formData.password}
        />
        {passwordMatch && (
          <div className="not-identical-passwords">
            The password is incorrect.
          </div>
        )}
        {userExist && (
          <>
            <div className="user-exist">
              This user dose not exist in the data.
            </div>
            <div className="username-Information">
              Try to remember if you used capital letters or numbers in the
              register process.
            </div>
          </>
        )}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
