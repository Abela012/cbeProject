import Case from "../models/case.model.js";

const createCase = async (req, res) => {
  try {
    const { caseCategory, customerId, subject } = req.body;

    const newCase = await Case.create({
      customerId: customerId,
      category: caseCategory,
      subject: subject,
      caseNumber: "",
    });
    return res.status(201).json("Case created sucessfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const getCases = async (req, res) => {
  try {
    if (
      req.query.q !== "null" &&
      req.query.q !== "" &&
      req.query.q !== undefined
    ) {
      let query = req.query.q;
      const cases = await Case.find({ caseNumber: query }).populate({
        path: "customerId",
        // select: "customerName email phone",
      });

      return res.json(cases);
    }

    const cases = await Case.find({}).populate({
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
    const foundCase = await Case.findOne({ _id: id }).populate("customerId");
    res.json(foundCase);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const updateCase = async (req, res) => {
  try {
    // const { id } = req.params;
    // const {} = req.body;

    // const updatedCase = await Case.findOneAndUpdate({ _id: id }, {});

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
    const deletedCase = await Case.findOneAndDelete({ _id: id });
    // console.log(deletedCase);
    return res.status(204).json("Case deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export {
  createCase,
  getCases,
  getCaseById,
  updateCase,
  updateCaseStatus,
  deleteCase,
};
