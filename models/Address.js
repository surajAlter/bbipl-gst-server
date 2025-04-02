const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
	buildingFlatNo: { type: String, required: true },
	premisesBuildingName: { type: String },
	streetName: { type: String, required: true },
	locality: { type: String },
	city: { type: String, required: true },
	district: { type: String, required: true },
	state: { type: String, required: true },
	pinCode: { type: String, required: true },
	country: { type: String, required: true, default: "India" },
	floorNo: { type: String },
	landmark: { type: String },
	latitude: { type: String },
	longitude: { type: String },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
