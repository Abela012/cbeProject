import Role from "../models/role.model.js";

const getRoles = async (req, res) => {
  try {
    if (
      req.query.q !== "null" &&
      req.query.q !== "" &&
      req.query.q !== "undefined"
    ) {
      let query = req.query.q;
      const foundRoles = await Role.find({
        roleName: new RegExp(query, "i"),
      });

      return res.json(foundRoles);
    }
    const roles = await Role.find({});
    return res.json(roles);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};
const getRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id });
    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const createRole = async (req, res) => {
  try {
    const { roleName, roleType } = req.body;
    const foundRole = await Role.findOne({
      $or: [{ roleName: roleName }, { roleType: roleType }],
    });
    if (foundRole) return res.status(400).json("Role already exists");
    const newRole = await Role.create({
      roleName,
      roleType,
    });

    return res.json("New role created");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, roleType } = req.body;
    const updatedRole = await Role.updateOne(
      { _id: id },
      { roleName, roleType }
    );

    return res.json("Role updated");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRole = await Role.findOneAndDelete({
      _id: id,
    });

    return res.json("Role delete");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

export { getRoles, getRole, createRole, updateRole, deleteRole };
