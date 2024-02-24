// Problem: Express Route for Product CRUD Operations

// Problem Statement: Create Express routes for handling CRUD operations on products using MongoDB and Mongoose. Implement routes for creating, reading, updating, and deleting products.

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

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

const createProduct = async (name, price, quantity) => {
	try {
		const product = new Product({ name, price, quantity });
		await product.save();
		return product;
	} catch (error) {
		throw new Error("Could not create product");
	}
};

const getAllProducts = async () => {
	try {
		const products = await Product.find();
		return products;
	} catch (error) {
		throw new Error("Could not fetch products");
	}
};

const getProductById = async (id) => {
	try {
		const product = await Product.findById(id);
		return product;
	} catch (error) {
		throw new Error("Could not fetch product");
	}
};

const updateProduct = async (id, updateData) => {
	try {
		const product = await Product.findByIdAndUpdate(id, updateData, {
			new: true,
		});
		return product;
	} catch (error) {
		throw new Error("Could not update product");
	}
};

const deleteProduct = async (id) => {
	try {
		await Product.findByIdAndDelete(id);
		return "Product deleted successfully";
	} catch (error) {
		throw new Error("Could not delete product");
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

		var id = null;
		// Create a new product
		createProduct("Laptop", 999, 10)
			.then((product) => {
				console.log("Created product:", product);
				id = product._id;
			})
			.catch((error) => console.error("Error creating product:", error));

		// Get all products
		getAllProducts()
			.then((products) => console.log("All products:", products))
			.catch((error) => console.error("Error fetching products:", error));

		// Get product by ID
		getProductById(id)
			.then((product) => console.log("Product by ID:", product))
			.catch((error) =>
				console.error("Error fetching product by ID:", error)
			);

		// Update product
		updateProduct(id, { price: 1099 })
			.then((updatedProduct) =>
				console.log("Updated product:", updatedProduct)
			)
			.catch((error) => console.error("Error updating product:", error));

		// Delete product
		deleteProduct(id)
			.then((message) => console.log(message))
			.catch((error) => console.error("Error deleting product:", error));
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
