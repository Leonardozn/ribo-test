const Client = require('../models/client')
const errMsgHelper = require('../helpers/errorMessages')
const mongoQuery = require('./mongo-query')

async function add(req, res, next) {
    try {
        if (!Array.isArray(req.body)) {
            let client = new Client(req.body)
            client = await client.save()
            res.status(201).json(client)
        } else {
            const client_list = await Client.insertMany(req.body)
            res.status(201).json(client_list)
        }
    } catch (error) {
        console.log(error)
        next(errMsgHelper.buildError(error))
    }
}

async function selectById(req, res, next) {
    try {
        const client = await Client.findById(req.params.id)
        if (!client) throw { status: 404, message: 'Client no found.' }

        res.status(200).json(client)
    } catch (error) {
        console.log(error)
        next(errMsgHelper.buildError(error))
    }
}

async function list(req, res, next) {
    try {
        const query = mongoQuery.buildJsonQuery(req.query, 'aggregate', schema())
        const client_list = await Client.aggregate(query)
        res.status(200).json(client_list)
    } catch (error) {
        console.log(error)
        next(errMsgHelper.buildError(error))
    }
}

async function update(req, res, next) {
    try {
        if (Object.keys(req.query).length) {
            const query = mongoQuery.buildJsonQuery(req.query, 'find', schema())
            const results = await Client.find(query)
            let modify = req.body
            if (Array.isArray(modify)) modify = modify[modify.length-1]
            
            const promises = results.map(item => {
                const { _id, ...body } = modify
                item = Object.assign(item, body)
                return item.save()
            })

            let client_list = []
            if (promises.length) client_list = await Promise.all(promises)

            res.status(200).json(client_list)
        } else {
            if (!Array.isArray(req.body)) {
                let client = await Client.findById(req.body._id)
                if (!client) throw { status: 404, message: 'Client no found.' }
    
                client = Object.assign(client, req.body)
                client = await client.save()
                res.status(200).json(client)
            } else {
                const promises = req.body.map(async (item) => {
                    let client = await Client.findById(item._id)
                    if (!client) throw { status: 404, message: `The client ${item._id} was not found.` }
    
                    client = Object.assign(client, item)
                    return client.save()
                })
    
                const client_list = await Promise.all(promises)
                res.status(200).json(client_list)
            }
        }
    } catch (error) {
        console.log(error)
        next(errMsgHelper.buildError(error))
    }
}

async function remove(req, res, next) {
    try {
        if (!Object.keys(req.query).length) throw { status: 400, message: 'Query params must be declared.' }

        const query = mongoQuery.buildJsonQuery(req.query, 'find', schema(), 'client')
        const client_list = await Client.remove(query)

        res.status(204).json(client_list)
    } catch (error) {
        console.log(error)
        next(errMsgHelper.buildError(error))
    }
}

function getSchema(req, res, next) {
    res.status(200).json(schema())
}

function schema() {
    return {
        first_name: { type: 'String', required: 'true',  },
		last_name: { type: 'String', required: 'true',  },
		document_id: { type: 'String', required: 'true',  },
		income: { type: 'Number',  },
		personal_credit: { type: 'Number',  },
		mortage_credit: { type: 'Number',  },
		credit_card_debt: { type: 'Number',  }
    }
}

module.exports = {
    add,
    selectById,
    list,
    update,
    remove,
    getSchema
}