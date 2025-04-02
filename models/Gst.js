const mongoose = require("mongoose");
const Address = require("./Address");

const gstSchema = new mongoose.Schema({
	name: { type: String, required: true },
	mobile: { type: String, required: true },
	email: { type: String, required: true },
	message: { type: String, required: true },
	responseMethod: { type: String, enum: ["email", "mobile"] },
	responseMessage: { type: String },
	status: { type: String, enum: ["Pending", "Complete"], default: "Pending" },

	//business details
	tradeName: { type: String },
	businessConstitution: {
		type: String,
		// enum: ["foreignCompany", "foreignLimitedLiabilityPartnership", "govtDept", "hinduUndividedFamily", "limitedLiabilityPartnership", "localAuthority", "others", "partnership", "pvtLtdCompany", "proprietorship", "publicLtdCompany", "publicSectorUndertaking", "societyClubTrustAOP", "statutoryBody", "unlimitedCompany"]
	},
	additionalTradeName: { type: [String] },
	casualTaxable: { type: Boolean },
	compositionOption: { type: Boolean },
	reason: {
		type: String,
		// enum: ["crossingThreshold", "interStateSupply", "liability", "transfer", "death", "deMerger", "change", "merger", "eCommerce", "sellingECommerce", "voluntart", "inputServiceDistributor", "suppliesBehalf", "SEZUnit", "SEZDev", "others", "corporateDentor"]
	},
	dateOfCommencement: { type: Date },
	dateLiabilityRegister: { type: Date },
	existingRegs: {
		type: [
			{
				typeOfReg: {
					type: String,
					// enum: ["GSTIN", "temporaryId", "regNoTIN", "centralSaleTaxRegNo", "centralExciseRegNo", "serviceTaxRegNo", "impExpCodeNo", "entryTaxRegNo", "entertainmentTaxRegNo", "hotelLuxuryTaxRegNo", "corporateIdentityNoForeighCompRegNo"]
				},
				regNo: { type: String },
				dateOfReg: { type: Date },
			},
		],
	},

	//promoter/partners

	//->personal info
	personName: {
		firstName: { type: String, required: true },
		midName: { type: String }, // Optional field
		lastName: { type: String, required: true },
	},
	fatherName: {
		firstName: { type: String, required: true },
		midName: { type: String }, // Optional field
		lastName: { type: String, required: true },
	},
	dob: { type: Date, required: true },
	gender: { type: String, enum: ["male", "female", "other"], required: true },
	telephone: { type: String },

	//->identity info
	designation: { type: String, required: true },
	directorIdentificationNo: { type: String },
	citizenIndia: { type: Boolean },
	passportNo: { type: String },
	aadhaarNo: { type: String },
	residentialAddress: { type: Address },

	//->documents
	photo: { type: String },

	//->other info
	isAuthorizedSignatory: { type: Boolean, required: true },

	//Authorized Signatory
	isPrimaryAuthorizedSignatory: { type: Boolean, required: true },
	proofOfAuthorizedSignatory: { type: String },

	//Authorized Representative
	hasAuthorizedRepresentative: { type: Boolean, required: true },

	//Principal Place of Business
	principalPlaceOfBusiness: { type: Address, required: true },
	stateJurisdiction: { type: String, required: true },
	centerJurisdiction: {
		commisionerate: { type: String, required: true },
		division: { type: String, required: true },
		range: { type: String, required: true },
	},
	officeEmail: { type: String, required: true },
	officeTelephone: { type: String },
	officeMobile: { type: String, required: true },
	officeFax: { type: String },
	possessionPremise: {
		type: String,
		// enum: ["consent", "leased", "others", "own", "rented", "shared"],
		required: true,
	},
	proofPrincipalPlaceBusiness: { type: String },
	natureOfBusiness: {
		type: [Boolean],
		// enum: ["manufacturer", "retailer", "wholesaler", "others"],
		required: true,
	},
	otherNatureOfBusiness: { type: [String] },
	additionalPlaceOfBusiness: { type: [Address] },

	//Goods & Services
	//->goods
	goods: { type: [String] },
	//->services
	services: { type: [String] },

	//State specific info
	proTaxEmpCodeNo: { type: String },
	proTaxRegCertificateNo: { type: String },
	stateExciseLicenceNo: { type: String },
	nameExciseLicence: { type: String },

	//Verification
	nameAuthSignatory: { type: String, required: true },
	placeAuthSignatory: { type: String, required: true },
	designationAuthSignatory: { type: String, required: true },
	submitDate: { type: Date, default: new Date() },

	// updatedAt: { type: Date, default: new Date() },
});

const gst = mongoose.model("gst", gstSchema);

module.exports = gst;
