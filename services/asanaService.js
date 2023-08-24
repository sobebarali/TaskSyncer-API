const axios = require("axios");

function getTask(taskGid, accessToken) {

  console.log(`Getting task with gid ${taskGid}`);

  const options = {
    method: "GET",
    url: `https://app.asana.com/api/1.0/tasks/${taskGid}`,
    headers: {
      accept: "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw new Error("Error getting task: " + error);
    });
}

module.exports = {
  getTask,
};


// Replace with your actual task GID and access token
const taskGid = "TASK_GID";
const accessToken = "YOUR_ACCESS_TOKEN";

// getTask(taskGid, accessToken)
//   .then(function (taskData) {
//     console.log(taskData);
//   })
//   .catch(function (error) {
//     console.error(error.message);
//   });
