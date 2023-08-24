const axios = require("axios");

function createRecords(baseId, apiKey, tableIdOrName, records) {
  const url = `https://api.airtable.com/v0/${baseId}/${tableIdOrName}`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const data = {
    records: records,
  };

  return axios
    .post(url, data, { headers })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Error creating records: " + error);
    });
}

module.exports = {
  createRecords,
};
