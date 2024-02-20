// 20. Problem: Express Route with MongoDB Aggregation

// Problem Statement: Create an Express route that uses MongoDB aggregation to calculate and return the average age of all users in the database.

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
	age: {
		type: Number,
	},
});

const isValidEmailAddress = async (email) => {
	try {
		var validRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return validRegex.test(email);
	} catch (err) {
		console.log("Error validating the email", err);
		return false;
	}
};

const User = mongoose.model("User", userSchema);

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

		// Validate Before Adding
		const isValid = await isValidEmailAddress(email);
		if (!isValid) {
			return console.log("Invalide Email Address");
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

const getAverageAge = async (req, res) => {
	try {
		const averageAge = await User.aggregate([
			{
				$group: {
					_id: null,
					averageAge: { $avg: "$age" },
				},
			},
		]);

		res.status(200).json({ averageAge: averageAge[0].averageAge });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const app = express();
app.get("/", serveRoot);
app.post("/register", addUserToDataBase);
app.get("/average-age", getAverageAge);

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
		await addUserToDataBase({
			username: "ayushshshvalisdfad",
			email: "josdfahn43534.4343.424dfk@example.com",
			age: 21,
		});
		await addUserToDataBase({
			username: "invalidEasdfamail",
			email: "asdfa.john@example.com",
			age: 87,
		});
		await addUserToDataBase({
			username: "validEasdfamail",
			email: "some245asdfaasdfa.sdafk@example.com",
			age: 19,
		});
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
