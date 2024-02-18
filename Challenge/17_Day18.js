// Problem: Express Route with MongoDB Query

// Problem Statement: Create an Express route that retrieves all users from the MongoDB database and returns them as a JSON response.
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
});

const User = mongoose.model("User", userSchema);

const getAllUser = async (req, res) => {
	try {
		const allData = await User.find();
		res.status(200).json(allData);
	} catch (err) {
		console.log("Error fetching data", err);
		process.exit(1);
	}
};

const addUserToDataBase = async (user) => {
	try {
		const { username, email } = user;
		console.log(user);

		// Check for null entries.
		if (!username || !email) {
			return console.log("All Fields Req");
		}

		// check if email already exists
		let oldUser = await User.findOne({ email });

		if (oldUser) {
			return console.log(
				`user with email ${oldUser.email} already exits.`
			);
		}

		oldUser = await User.findOne({ username });
		if (oldUser) {
			return console.log(
				`user with username ${oldUser.username} already exits.`
			);
		}

		const newUser = await User.create({ ...user });

		return console.log(`User ${newUser} created`);
	} catch (err) {
		console.log("Error registering a new userSchema", err);
		process.exit(1);
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
app.post("/register", addUserToDataBase);
app.get("/getAllUser", getAllUser);

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

		// TestCase
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
