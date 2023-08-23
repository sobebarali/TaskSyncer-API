const Asana = require("asana");

const oauth2 = Asana.ApiClient.instance.authentications["oauth2"];
oauth2.accessToken = process.env.asana_pat;

const tasksApiInstance = new Asana.TasksApi();

exports.createTask = (req, res) => {
  const taskData = {
    name: "New Task",
    approval_status: "pending",
    assignee_status: "upcoming",
    completed: false,
    external: {
      gid: "1234",
      data: "A blob of information.",
    },
    html_notes:
      "<body>Mittens <em>really</em> likes the stuff from Humboldt.</body>",
    is_rendered_as_separator: false,
    liked: true,
    assignee: "me",
    projects: ["<YOUR_PROJECT_GID>"],
  };

  const body = new Asana.TasksBody.constructFromObject({ data: taskData });
  const opts = {};

  tasksApiInstance.createTask(body, opts, (error, data, response) => {
    if (error) {
      console.error(error);
      res.status(500).send("An error occurred while creating the task.");
    } else {
      console.log("Task created successfully.");
      res.status(201).json(data);
    }
  });
};
