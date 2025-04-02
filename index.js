require("dotenv").config();

const connectDB = require("./config/db");

// Import from env
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

const express = require("express");
const cors = require("cors");

//for cookies
const cookieParser = require("cookie-parser");

const app = express();

// CORS configuration
app.use(
	cors({
		origin: CLIENT_URL,
	})
);
app.use(cookieParser());
app.use(express.json());

const authAuthController = require("./controllers/auth");
const gst = require("./controllers/gst");

// app.use("/api/user", userRoutes);
app.use("/api/auth", authAuthController);
app.use("/api/gst", gst);

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
