import Case from "../models/case.model.js";
import { v4 as uuidv4 } from "uuid";
import Task from "../models/task.model.js";

const createCase = async (req, res) => {
  try {
    const {
      caseCategory,
      userId,
      appointmentId,
      officeId,
      customerId,
      subject,
      description,
    } = req.body;

    const newCase = await Case.create({
      userId,
      customerId: customerId,
      appointmentId: appointmentId,
      officeId: officeId,
      category: caseCategory,
      subject: subject,
      description: description,
      caseNumber: uuidv4(),
    });
    return res.status(201).json("Case created sucessfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const getCaseStati = async (req, res) => {
  try {
    const result = await Case.aggregate([
      {
        $match: { isDeleted: false }, // Optional: Filter out deleted cases
      },
      {
        $group: {
          _id: "$status", // Group by the status field
          count: { $sum: 1 }, // Count each case in the group
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          status: "$_id", // Rename _id to status
          count: 1, // Keep the count
        },
      },
      {
        $group: {
          _id: null, // Group all results into a single document
          counts: { $push: { status: "$status", count: "$count" } }, // Push status and count into an array
          total: { $sum: "$count" }, // Calculate the total count
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          counts: 1, // Include the counts array
          total: 1, // Include the total count
        },
      },
    ]);

    // If there are no cases, return zero counts
    if (result.length === 0) {
      return res.json({
        counts: [
          { status: "Pending", count: 0 },
          { status: "Canceled", count: 0 },
          { status: "Completed", count: 0 },
        ],
        total: 0,
      });
    }

    // Format the result to include all statuses even if count is 0
    const counts = result[0].counts;
    const statuses = ["Pending", "Canceled", "Completed"];
    const formattedCounts = statuses.map((status) => {
      const found = counts.find((item) => item.status === status);
      return {
        status,
        count: found ? found.count : 0,
      };
    });

    return res.json({
      counts: formattedCounts,
      total: result[0].total, // Total count of all appointments
    });
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const getCases = async (req, res) => {
  try {
    const { officeId } = req.params;

    if (
      req.query.q !== "null" &&
      req.query.q !== "" &&
      req.query.q !== "undefined"
    ) {
      let query = req.query.q;
      const cases = await Case.find({
        $and: [
          { caseNumber: new RegExp(query) },
          {
            $or: [
              { officeId: officeId },
              { assignedOfficeIdList: { $in: [officeId] } },
            ],
          },
        ],
        isDeleted: false,
      }).populate({
        path: "customerId",
        // select: "customerName email phone",
      });

      return res.json(cases);
    }

    const cases = await Case.find({
      $or: [
        { officeId: officeId },
        { assignedOfficeIdList: { $in: [officeId] } },
      ],
      isDeleted: false,
    }).populate({
      path: "customerId",
      // select: "customerName email phone",
    });

    return res.json(cases);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCase = await Case.findOne({
      _id: id,
      isDeleted: false,
    }).populate(
      "category customerId currentAssignedOfficeId assignedOfficeIdList"
    );
    res.json(foundCase);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const getCaseTask = async (req, res) => {
  try {
    const { caseId, officeId } = req.params;
    const tasks = await Task.find({ caseId, officeId });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const assigneCase = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { officeId, description } = req.body;

    const updatedCaseAssignment = await Case.updateOne(
      { _id: caseId },
      {
        assigner: req.user._id,
        $addToSet: { assignedOfficeIdList: officeId },
      }
    );
    const newTask = await Task.create({
      caseId: caseId,
      officeId: officeId,
      description: description,
    });
    return res.status(200).json("Case assigned successfully");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, description, category } = req.body;

    const updatedCase = await Case.findOneAndUpdate(
      { _id: id },
      {
        subject,
        description,
        category,
      }
    );

    return res.status(200).json("Case updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const updateCaseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedCase = await Case.findOneAndUpdate({ _id: id }, { status });

    return res.status(200).json("Case updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const deleteCase = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCase = await Case.findOneAndUpdate(
      { _id: id },
      { isDeleted: true }
    );
    const deletedTask = await Task.findOneAndUpdate(
      { _id: id },
      { isDeleted: true }
    );
    return res.status(204).json("Case deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export {
  createCase,
  getCaseStati,
  getCases,
  getCaseById,
  getCaseTask,
  assigneCase,
  updateCase,
  updateCaseStatus,
  deleteCase,
};
