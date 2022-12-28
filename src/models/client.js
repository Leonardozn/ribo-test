const mongoose = require('../modules/mongoConnection')
const Schema = mongoose.Schema

const clientSchema = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	document_id: { type: String, required: true },
	income: { type: Number, default: 0 },
	personal_credit: { type: Number, default: 0 },
	mortage_credit: { type: Number, default: 0 },
	credit_card_debt: { type: Number, default: 0 }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client