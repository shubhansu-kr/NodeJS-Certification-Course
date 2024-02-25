// Problem: Mongoose Indexing

// Problem Statement: Implement indexing on the "name" field of the "Product" collection to optimize query performance. Write a function to create the index.

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

productSchema.index({ name: 1 });

const Product = mongoose.model("Product", productSchema);

const categorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
});

const Category = mongoose.model("Category", categorySchema);

const createNameIndex = async () => {
	try {
		await productSchema.index({ name: 1 });
		console.log(
			'Index created on the "name" field of the Product collection.'
		);
	} catch (error) {
		console.error("Error creating index:", error);
	}
};

const getAllProductsWithCategory = async () => {
	try {
		const products = await Product.find().populate("category");
		return products;
	} catch (error) {
		throw new Error("Could not fetch products with category details");
	}
};

const populateDatabase = async () => {
	try {
		const category1 = await Category.create({
			name: "Electronics",
			description: "Electronic products",
		});
		const category2 = await Category.create({
			name: "Clothing",
			description: "Clothing items",
		});

		await Product.create({
			name: "Laptop",
			price: 9399,
			quantity: 10,
			category: category1._id,
		});
		await Product.create({
			name: "Smartphone",
			price: 7929,
			quantity: 15,
			category: category1._id,
		});
		await Product.create({
			name: "T-shirt",
			price: 239,
			quantity: 50,
			category: category2._id,
		});
		await Product.create({
			name: "Jeans",
			price: 449,
			quantity: 30,
			category: category2._id,
		});

		console.log("Database populated successfully");
	} catch (error) {
		console.error("Error populating database:", error);
	}
};

const port = 5050;
const url = "mongodb://localhost:27017/scaler";

const currentDir = __dirname;
const filePath = path.join(currentDir, "./../public/index.html");

const serveRoot = async (req, res) => {
	try {
		res.status(200).sendFile(filePath);
	} catch (err) {
		console.log("Error Serving root file");
	}
};

const app = express();
app.get("/", serveRoot);

const connectDB = (url) => {
	return mongoose
		.connect(url)
		.then(() => {
			console.log("Successfully connected to DB");
		})
		.catch((err) => {
			console.log("Error Connecting to the DB", err);
			process.exit(1);
		});
};

const disconnectDB = () => {
	mongoose.connection.close((err) => {
		if (err) {
			console.error("Error closing MongoDB connection:", err);
		} else {
			console.log("MongoDB connection closed successfully");
		}
	});
};

const start = async () => {
	try {
		await connectDB(url);

		app.listen(port, () => {
			console.log(`Server is listening to port: ${port}`);
			console.log(`Go Live: http://localhost:${port}`);
		});

        await createNameIndex();
		await populateDatabase();

		getAllProductsWithCategory()
			.then((products) =>
				console.log("All products with category details:", products)
			)
			.catch((error) =>
				console.error(
					"Error fetching products with category details:",
					error
				)
			);
	} catch (err) {
		console.log(`Error starting the server`, err);
		process.exit(1);
	}
};

start();

process.on("SIGINT", () => {
	console.log("Shutting down gracefully");

	try {
		disconnectDB();
		console.log("DB Disconnected successfully");
	} catch (err) {
		console.log("Error disconnecting mongoDB", err);
	}

	process.exit(0);
});
