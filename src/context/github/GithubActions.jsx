 export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  try {
    console.log(params.toString())
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
