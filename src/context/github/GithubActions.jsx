import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` },
});
//GET USERS and REPOS

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  
    const response = await github.get(`search/users?${params}`)
    return response.data.items
}
//get single user

export const getUserAndRepos = async (login) => {

  const queryParams = new URLSearchParams({
    sort: "created",
    per_page: 10
  });

    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos?${queryParams}`),
    ])

    return {user: user.data, repos: repos.data}
};
