import Category from "../models/category.model.js";

const getCategories = async (req, res) => {
  try {
    if (
      req.query.q !== "null" &&
      req.query.q !== "" &&
      req.query.q !== "undefined"
    ) {
      let query = req.query.q;
      const foundCategories = await Category.find({
        categoryName: new RegExp(query, "i"),
      });

      return res.json(foundCategories);
    }
    const categories = await Category.find({});
    return res.json(categories);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const newCategory = await Category.create({
      categoryName,
    });

    return res.json("New category created");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const updatedCategory = await Category.updateOne(
      { _id: id },
      { categoryName }
    );

    return res.json("Category updated");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await Category.findOneAndDelete({
      _id: id,
    });

    return res.json("Category delete");
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
