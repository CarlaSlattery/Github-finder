import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

//const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
//const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });
 
  //get search results
  const searchUsers = async (text) => {
     setLoading();

     const params = new URLSearchParams ({
      q: text
     })
    try {
      const response = await fetch(
        `https://api.github.com/search/users?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const {items} = await response.json();
      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get single user

  const getUser = async (login) => {
    setLoading();

   
    try {
      const response = await fetch(
        `https://api.github.com/users/${login}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      if (response.status === 404){
        window.location ="/notfound"
      }

       else if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
// get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    });
    
    try {
      const response = await fetch(
        `https://api.github.com/users/${login}/repos?${params}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };


  //clear users
  const clearUsers = () => dispatch({type: "CLEAR_USERS"})

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        getUser,
        clearUsers,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
