const express = require("express");
const app = express();
require("dotenv").config();

const webhookRoutes = require("./routes/webhookRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use("/webhook", webhookRoutes);
app.use("/task", taskRoutes);

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});
