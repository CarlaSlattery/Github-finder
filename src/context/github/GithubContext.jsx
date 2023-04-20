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
 
  //get initial users (testing purposes)
  const fetchUsers = async () => {
     setLoading();
    try {
      const response = await fetch("https://api.github.com/users", {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      dispatch({
        type: "GET_USERS",
        payload: data,
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
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
