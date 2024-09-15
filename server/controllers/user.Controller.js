import User from "../models/user.model.js";
import Role from "../models/role.model.js";
import bcrypt from "bcrypt";

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

      return res.json(user);
    }
    const foundUsers = await User.find({}).populate({
      path: "roleType",
      select: "roleType",
    });
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
    const { name, email, officeId } = req.body;
    const updatedUser = await User.updateOne(
      { _id: id },
      { name, email, officeId }
    );

    return res.status(200).json("User updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );
    return res.status(200).json("User password updated");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await User.findOneAndUpdate(
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
    const foundUser = await User.findOne({ _id: id });
    const foundRole = await Role.findOne({ _id: foundUser.roleType });

    if (foundRole.roleName == "Admin") {
      const foundUser = await User.aggregate([
        {
          $match: {
            roleType: foundRole._id,
          },
        },
        {
          $group: {
            _id: "$roleType",
            userCount: { $sum: 1 },
          },
        },
      ]);
      if (foundUser[0].userCount == 1)
        return res.status(400).json("Can not all admin user");
      const deleteUser = await User.deleteOne({ _id: id });
    }
    const deleteUser = await User.deleteOne({ _id: id });
    return res.status(200).json("User deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export {
  getUsers,
  getUser,
  updateUser,
  updateUserPassword,
  updateUserRole,
  deleteUser,
};
