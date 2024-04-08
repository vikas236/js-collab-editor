const server = (() => {
  function getUsers() {
    let data = "";
    // Make a GET request to retrieve user data from the server
    return fetch("http://localhost:3000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response body as JSON
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  async function updateUsers(formDataObj) {
    try {
      console.log(formDataObj);
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return { getUsers, updateUsers };
})();

export default server;
