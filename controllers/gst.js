const express = require("express");
const router = express.Router();
const Gst = require("../models/Gst");
const verify_token = require("../middlewares/verify_token");
const sendEmail = require("../middlewares/send_email");

// POST endpoint to save gst registration form details
router.post("/", verify_token, async (req, res) => {
	try {
		if (!req.userId && !req.role)
			return res.status(403).send({ message: "Unauthenticated Access" });

		if (req.role) req.userId = "Official-" + req.officialId;

		const data = {
			...req.body,
			userId: req.userId,
		};
		const newGst = new Gst(data);

		await newGst.save();

		// console.log("Message submitted");
		res.status(200).send({
			message: "Form submitted! We'll reach you soon.",
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

router.get("/", verify_token, async (req, res) => {
	try {
		// const data = await Gst.find({});

		// res.status(200).send({
		// 	data,
		// });

		const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
		const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const totalDocuments = await Gst.countDocuments(); // Total number of documents

		let data;
		if (!req.role) {
			data = await Gst.find({ userId: req.userId })
				.sort({ _id: -1 })
				.skip(startIndex)
				.limit(limit);
		} else {
			data = await Gst.find()
				.sort({ _id: -1 })
				.skip(startIndex)
				.limit(limit);
		}

		// Pagination result
		const pagination = {};

		if (endIndex < totalDocuments) {
			pagination.next = {
				page: page + 1,
				limit: limit,
			};
		}

		if (startIndex > 0) {
			pagination.previous = {
				page: page - 1,
				limit: limit,
			};
		}

		res.status(200).send({
			data,
			pagination,
			totalDocuments,
		});
	} catch (e) {
		res.status(500).json({ message: "Server Error" });
	}
});

// router.put("/", verify_token, async (req, res) => {
// 	try {
// 		// console.log("Request received as:\n", req);
// 		if (req.role !== "admin")
// 			return res.status(403).send({ message: "Unauthorized" });
// 		else if (
// 			!req.body.id ||
// 			!req.body.responseMethod ||
// 			!req.body.responseMessage
// 		) {
// 			return res.status(400).send({
// 				message: "Please provide all the required fields",
// 			});
// 		}

// 		const data = await Gst.findById(req.body.id);

// 		if (!data) {
// 			return res.status(404).send({
// 				message: "Such contact request was not found",
// 			});
// 		} else if (data.status === "Complete") {
// 			return res.status(400).send({
// 				message: "Already replied to this request",
// 			});
// 		}

// 		const mailOptions = {
// 			to: data.email,
// 			subject: "Response to your query",
// 			html: `<p>Hello ${data.name},</p>
//                 <p>${req.body.responseMessage}</p>
//                 <br />
//                 <p>Thanks for reaching out!</p>
//                 <p>Team BBIPL</p>`,
// 		};

// 		await sendEmail(
// 			mailOptions,
// 			res,
// 			"Reply email couldn't be sent",
// 			"Reply email sent"
// 		);

// 		data.responseMethod = req.body.responseMethod;
// 		data.responseMessage = req.body.responseMessage;
// 		data.status = req.body.status || "Complete";
// 		await data.save();

// 		res.status(200).send({
// 			message: "Reply sent successfully!",
// 		});
// 	} catch (e) {
// 		return res.status(500).json({ message: "Server Error" });
// 	}
// });

module.exports = router;
