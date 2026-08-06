import * as categoryService from '../services/categoryService.js';

export const getCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ success: true, data: { categories } });
};

export const getCategory = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).json({ success: true, data: { category } });
};

export const createCategory = async (req, res) => {
  const categoryData = { ...req.body };
  if (req.file) {
    categoryData.image = req.file.path;
  }
  const category = await categoryService.createCategory(categoryData);
  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    data: { category },
  });
};

export const updateCategory = async (req, res) => {
  const categoryData = { ...req.body };
  if (req.file) {
    categoryData.image = req.file.path;
  }
  const category = await categoryService.updateCategory(req.params.id, categoryData);
  res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    data: { category },
  });
};

export const deleteCategory = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
};