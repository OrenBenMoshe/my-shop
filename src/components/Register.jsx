import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  console.log("render Register.jsx");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [uniqueNickName, setUniqueNickName] = useState(true);
  const [identicalPasswords, setIdenticalPasswords] = useState(false);
  const {
    authorized,
    validUsername,
    setValidUsername,
    usersList,
    setUsersList,
    setAuthorized,
    setUser,
  } = useContext(UserContext);

  useEffect(() => {
    if (authorized) navigate("/Home");
  }, [authorized, navigate]);

  useEffect(() => {
    localStorage.setItem("usersList", JSON.stringify(usersList));
  }, [usersList]);

  const register = (event) => {
    event.preventDefault();
    if (usersList.find((x) => x.username === formData.username)) {
      setUniqueNickName(false);
      setValidUsername(true);
      setIdenticalPasswords(false);
      resetFormData();
      return;
    }
    console.log(formData);
    if (formData.username.length > 10) {
      setValidUsername(false);
      setUniqueNickName(true);
      setIdenticalPasswords(false);
      resetFormData();
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setIdenticalPasswords(true);
      setUniqueNickName(true);
      setValidUsername(true);
      resetFormData();
      return;
    } else {
      const localStorageData = {
        username: formData.username,
        password: formData.password,
      };
      setUsersList((prevItems) => {
        return [...prevItems, localStorageData];
      });
      setUser(localStorageData.username);
      setAuthorized(true);
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

  const handleRegister = (event) => {
    const id = event.target.id;
    const userInput = event.target.value.replace(/\s+/g, "");
    switch (id) {
      case "username":
        setFormData({ ...formData, username: userInput });
        break;
      case "password":
        setFormData({ ...formData, password: userInput });
        break;
      case "confirm-password":
        setFormData({ ...formData, confirmPassword: userInput });
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={register}>
        <label htmlFor="username">username:</label>
        <input
          id="username"
          type="text"
          onChange={handleRegister}
          required
          value={formData.username}
          autoComplete="off"
          autoFocus
        />
        <label htmlFor="password">password:</label>
        <input
          id="password"
          type="password"
          onChange={handleRegister}
          required
          value={formData.password}
        />
        <div className="confirm-password">
          <label htmlFor="confirm password">confirm password:</label>
          <input
            id="confirm-password"
            type="password"
            onChange={handleRegister}
            required
            value={formData.confirmPassword}
          />
        </div>

        {identicalPasswords && (
          <div className="not-identical-passwords">
            The passwords are not identical.
          </div>
        )}
        {!validUsername && (
          <div className="valid-username">
            the username must be less then 10 chars
          </div>
        )}
        {!uniqueNickName && (
          <div className="unique-name">
            This username already exists, please choose another name.
          </div>
        )}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
