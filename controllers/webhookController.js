const crypto = require("crypto");
const { getTask } = require("../services/asanaService");
const { createRecords } = require("../services/airtableService");

let secret = "";
const asana_pat = process.env.asana_pat;
const airtable_api_key = process.env.airtable_api_key;
const airtable_base_id = process.env.airtable_base_id;
const airtable_table_id_or_name = "tblHjvRP0FHEa9RQL";

exports.receiveWebhook = (req, res) => {
  if (req.headers["x-hook-secret"]) {
    console.log("This is a new webhook");
    secret = req.headers["x-hook-secret"];

    res.setHeader("X-Hook-Secret", secret);
    res.sendStatus(200);
  } else if (req.headers["x-hook-signature"]) {
    const computedSignature = crypto
      .createHmac("SHA256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(req.headers["x-hook-signature"]),
        Buffer.from(computedSignature)
      )
    ) {
      res.sendStatus(401);
    } else {
      res.sendStatus(200);
      console.log(`Events on ${Date()}:`);
      const events = req.body.events;

      console.log(events);
      for (const event of events) {
        if (
          event.action === "added" 
          && event.parent.resource_type === "section"
          && event.resource.resource_type === "task"
        ) {
          const task_gid = event.resource.gid;
          getTask(task_gid, asana_pat)
            .then((task_details) => {
              const taskId = task_details.data.gid;
              const name = task_details.data.name || "No Task Name";
              const assignee =
                task_details.data.assignee.name || "No Assignee Name";
              const dueDate = task_details.data.due_on
                ? task_details.data.due_on
                : null;

              const records = [
                {
                  fields: {
                    "Task ID": taskId,
                    Name: name,
                    Assignee: assignee,
                    "Due Date": dueDate,
                    Description: "Test description",
                  },
                },
              ];

              // Call the createRecords function to create the record in Airtable
              createRecords(
                airtable_base_id,
                airtable_api_key,
                airtable_table_id_or_name,
                records
              )
                .then((createdRecords) => {
                  console.log("Records created:", createdRecords);
                })
                .catch((error) => {
                  console.error("Error creating records:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching task details:", error);
            });
        }
      }
    }
  } else {
    console.error("Something went wrong!");
  }
};
