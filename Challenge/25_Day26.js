// Problem: Mongoose Indexing

// Problem Statement: Implement indexing on the "name" field of the "Product" collection to optimize query performance. Write a function to create the index.

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

const getProductStats = async () => {
	try {
		const pipeline = [
			{ $group: { _id: null, totalProducts: { $sum: 1 } } },
			{ $group: { _id: null, averagePrice: { $avg: "$price" } } },
			{ $sort: { quantity: -1 } },
			{ $limit: 1 },
		];

		const stats = await Product.aggregate(pipeline);

		const totalProducts = stats[0]?.totalProducts || 0``;
		const averagePrice = stats[1]?.averagePrice || 0;
		const highestQuantityProduct = stats[2]?.name || "N/A";
		const highestQuantity = stats[2]?.quantity || 0;

		return {
			totalProducts,
			averagePrice,
			highestQuantityProduct,
			highestQuantity,
		};
	} catch (error) {
		throw new Error("Error calculating product statistics");
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

		const stats = await getProductStats();
		console.log(stats);
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
