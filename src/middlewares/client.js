const Joi = require('joi')
const errorMessages = require('../helpers/errorMessages')

function validationSchema(req, res, next) {
    const schema = Joi.object({
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		document_id: Joi.string().required(),
		income: Joi.number().allow(null),
		personal_credit: Joi.number().allow(null),
		mortage_credit: Joi.number().allow(null),
		credit_card_debt: Joi.number().allow(null)
	})

	try {
		if (Array.isArray(req.body)) {
			for (let item of req.body) {
				const { error, value } = schema.validate(item)
				if (error) throw { status: 400, message: error.details[0].message, item: value }
			}
		} else {
			const { error, value } = schema.validate(req.body)
			if (error) throw { status: 400, message: error.details[0].message, item: value }
		}

		next()
	} catch (error) {
		res.status(400).send(errorMessages.buildError(error))
	}
}

module.exports = validationSchema