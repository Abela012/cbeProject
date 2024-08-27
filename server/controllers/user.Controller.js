import User from "../models/user.model.js";

const getUsers = async (req, res) => {
  try {
    if (
      req.query.q !== "null" &&
      req.query.q !== "" &&
      req.query.q !== undefined
    ) {
      let query = req.query.q;
      const user = await User.find({
        $or: [
          { name: new RegExp(query, "i") },
          { email: new RegExp(query, "i") },
        ],
      });
      // .populate(
      //   {
      //     path: "customerId",
      //     select: "customerName email phone",
      //   }
      // );
      console.log("sdf");

      return res.json(user);
    }
    const foundUsers = await User.find({});
    return res.status(200).json(foundUsers);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await User.findOne({ _id: id });
    return res.status(200).json(foundUser);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, officeId, roleType } = req.body;
    const updatedUser = await User.updateOne(
      { _id: id },
      { name, email, roleType }
    );

    return res.status(200).json("User updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedCase = await User.findOneAndUpdate(
      { _id: id },
      { roleType: role }
    );

    return res.status(200).json("User role updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {} = req.body;
    const deleteUser = await User.deleteOne({ _id: id });
    return res.status(200).json("");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

export { getUsers, getUser, updateUser, updateUserRole, deleteUser };
