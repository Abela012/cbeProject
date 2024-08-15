import Category from "../models/category.model.js";

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json(categories);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

export { getCategories };
