const mongoose = require("mongoose");
const Time = require("./Time");

const UserSchema = new mongoose.Schema({
	// firstName: { type: String, required: true },
	// lastName: String,
	// email: { type: String, unique: true, required: true },
	// mobile: { type: String, unique: true, required: true },
	// password: { type: String, required: true },
	// countryCode: String,
	// gender: { type: String, enum: ["male", "female", "other"], required: true },
	// dob: { type: Time.schema, required: true },

	role: {
		type: String,
		// enum: [ "taxpayer", "taxDeductor", "taxCollector", "gstPractitioner", "nonResidentTaxablePerson", "unitedNationBody", "consulateOrEmbassyForeignCountry", "otherNotifiedPerson", "nonResidentOnlineServicesProvider" ],
		required: true,
	},
	state: { type: String, required: true },
	district: { type: String, required: true },
	businessName: { type: String, required: true },
	pan: { type: String, required: true },
	email: { type: String, required: true },
	mobile: { type: String, required: true },
	password: { type: String, required: true },

	lastSent: { type: Date, default: new Date() },
	isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
