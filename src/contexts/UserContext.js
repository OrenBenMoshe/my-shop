import { createContext, useEffect, useState } from "react";

const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [authorized,setAuthorized] = useState(false)
    const [validUsername, setValidUsername] = useState(true);
    const [changePost, setChangePost] = useState(0);
    const [usersList, setUsersList] = useState(
        JSON.parse(localStorage.getItem("usersList")) === null ?
        [] : JSON.parse(localStorage.getItem("usersList"))
    );
    const [posts, setPosts] = useState(
        JSON.parse(localStorage.getItem("postsList")) === null
          ? []
          : JSON.parse(localStorage.getItem("postsList"))
      );

      useEffect(() => {
        if (posts.length === 0) return;
        localStorage.setItem("postsList", JSON.stringify(posts));
      }, [posts]);

    const value ={loggedIn, setLoggedIn, user, setUser,
                authorized, setAuthorized ,validUsername,
                setValidUsername, changePost, setChangePost,
                usersList, setUsersList, posts, setPosts}
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;