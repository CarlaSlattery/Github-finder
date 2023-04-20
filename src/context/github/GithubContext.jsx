import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

//const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
//const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
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

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
