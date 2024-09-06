import OfficeManagement from "../models/officeManagement.model.js";

const getOffices = async (req, res) => {
  try {
    if (
      req.query.q !== "null" &&
      req.query.q !== "" &&
      req.query.q !== "undefined"
    ) {
      let query = req.query.q;
      const foundOffices = await OfficeManagement.find({
        officeName: new RegExp(query, "i"),
      });

      return res.json(foundOffices);
    }
    const foundOffices = await OfficeManagement.find({});
    return res.status(200).json(foundOffices);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};
const getOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const foundOffice = await OfficeManagement.findOne({ _id: id });
    return res.status(200).json(foundOffice);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const createOffice = async (req, res) => {
  try {
    const { officeName } = req.body;
    const newOffice = await OfficeManagement.create({
      officeName,
    });

    return res.json("New office created");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const { officeName } = req.body;
    const updatedOffice = await OfficeManagement.updateOne(
      { _id: id },
      { officeName }
    );

    return res.json("Office updated");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const deleteOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOffice = await OfficeManagement.findOneAndDelete({
      _id: id,
    });

    return res.json("Office delete");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

export { getOffices, getOffice, createOffice, updateOffice, deleteOffice };
