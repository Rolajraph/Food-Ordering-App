import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import Food from '../models/Food.js';
import { categories } from './categories.js';
import { foods } from './foods.js';

const seed = async () => {
  await connectDB();

  console.log('Clearing existing Category and Food data...');
  await Food.deleteMany();
  await Category.deleteMany();

  console.log('Inserting categories...');
  const insertedCategories = await Category.insertMany(categories);
  const categoryIdByName = new Map(insertedCategories.map((c) => [c.name, c._id]));

  const foodsWithResolvedCategories = foods.map((food) => ({
    ...food,
    category: categoryIdByName.get(food.category),
  }));

  const unresolved = foodsWithResolvedCategories.filter((f) => !f.category);
  if (unresolved.length > 0) {
    console.error(
      'Aborting: these foods reference a category name with no match:',
      unresolved.map((f) => f.name)
    );
    process.exit(1);
  }

  console.log('Inserting foods...');
  await Food.insertMany(foodsWithResolvedCategories);

  console.log(
    `Done: seeded ${insertedCategories.length} categories and ${foodsWithResolvedCategories.length} foods.`
  );

  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});