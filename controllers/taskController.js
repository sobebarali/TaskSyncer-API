const Asana = require("asana");

const oauth2 = Asana.ApiClient.instance.authentications["oauth2"];
oauth2.accessToken = process.env.asana_pat;

const tasksApiInstance = new Asana.TasksApi();

exports.createTask = (req, res) => {
  let asana_project_gid = process.env.asana_project_gid;

  const taskData = {
    name: "Bug Task",
    resource_subtype: "default_task",
    approval_status: "pending",
    assignee_status: "upcoming",
    completed: false,
    html_notes:
      "<body>Mittens <em>really</em> likes the stuff from Humboldt.</body>",
    notes: "Hello, world!",
    liked: true,
    projects: [`${asana_project_gid}`],
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
