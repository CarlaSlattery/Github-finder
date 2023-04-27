 //GET USERS
 export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  try {
   // console.log(params.toString()) **debugging
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

    const { items } = await response.json();
    return items;
  } catch (error) {
    console.log(error);
  }
};
//get single user

  export const getUser = async (login) => {
    

    try {
      const response = await fetch(`https://api.github.com/users/${login}`, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      });

      if (response.status === 404) {
        window.location = "/notfound";
      } else if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
     return data
    } catch (error) {
      console.log(error);
    }
  };
  // get user repos
  export const getUserRepos = async (login) => {
    

    const params = new URLSearchParams({
      sort: "created",
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
     return data
    } catch (error) {
      console.log(error);
    }
  };