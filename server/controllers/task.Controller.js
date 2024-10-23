import Task from "../models/task.model.js";
import WorkflowManagement from "../models/workflowManagement.model.js";

const getTasks = async (req, res) => {
  try {
    const { officeId } = req.params;

    const tasks = await Task.find({
      $or: [{ officeId: officeId }, { assigner: req.user._id }],
      isDeleted: false,
    }).populate({
      path: "assigner",
      select: "name email officId",
    });
    const updateTasks = await Task.updateMany(
      { officeId: officeId },
      { isSeen: true }
    );

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const getTaskFollowUp = async (req, res) => {
  try {
    const { caseId, officeId } = req.params;
    // console.log(req.params);

    const tasks = await Task.find({
      $and: [{ officeId: officeId }, { caseId: caseId }],
      isDeleted: false,
    });
    // Promise.all helps get the actual data instead of Promises
    // map doesn't inherently handle asynchronous operations like await
    const taskChats = await Promise.all(
      tasks.map(async (task) => {
        const response = await WorkflowManagement.findOne({
          taskId: task._id,
        }).populate({ path: "taskId", select: "caseId dueDate description" });
        return response;
      })
    );
    // console.log(taskChats);

    return res.json(taskChats);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const sendMessage = async (req, res) => {
  try {
    const { userId, taskId, message } = req.body;

    const foundWorkflow = await WorkflowManagement.findOne({ taskId });
    if (foundWorkflow) {
      await WorkflowManagement.findOneAndUpdate(
        { taskId },
        {
          $push: {
            followUp: {
              user: userId,
              message: message,
              time: new Date().toISOString(),
            },
          },
        }
      );
      return res.json("Message send");
    }
    WorkflowManagement.create({
      taskId,
      "followUp.user": userId,
      "followUp.message": message,
    });
    return res.json("Message send");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export { getTasks, getTaskFollowUp, sendMessage };
