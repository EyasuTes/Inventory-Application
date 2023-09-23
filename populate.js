const mongoose = require('mongoose');

// Connection URI for your MongoDB Atlas cluster
const uri = 'mongodb+srv://EyasuAraya:Et07115593@cluster0.1fegr3o.mongodb.net/Inventory_Application?retryWrites=true&w=majority';

// Define the schema for the "categories" collection
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Define the schema for the "items" collection
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category
  price: Number,
  number_in_stock: Number,
});

// Create Mongoose models for the collections
const Category = mongoose.model('Category', categorySchema);
const Item = mongoose.model('Item', itemSchema);

// Sample data for categories
const categoriesData = [
  { name: 'Category 1', description: 'Category 1 Description' },
  { name: 'Category 2', description: 'Category 2 Description' },
  // Add more categories as needed
];

// Sample data for items
const itemsData = [
  {
    name: 'Item 1',
    description: 'Item 1 Description',
    category: null, // Set the category reference here (null for now)
    price: 10,
    number_in_stock: 5,
  },
  {
    name: 'Item 2',
    description: 'Item 2 Description',
    category: null, // Set the category reference here (null for now)
    price: 20,
    number_in_stock: 10,
  },
  // Add more items as needed
];

async function insertData() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert documents into the "categories" collection
    const categories = await Category.insertMany(categoriesData);

    // Set the category references for items
    itemsData[0].category = categories[0]._id; // Assign Category 1 to Item 1
    itemsData[1].category = categories[1]._id; // Assign Category 2 to Item 2

    // Insert documents into the "items" collection
    await Item.insertMany(itemsData);

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

insertData();
