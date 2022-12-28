const clientCtrl = require('../controllers/client')
const validationSchema = require('../middlewares/client')

function clientRouter(router) {
    router.post('/client/add', validationSchema, clientCtrl.add)
    router.get('/client/select/:id', clientCtrl.selectById)
    router.get('/client/list', clientCtrl.list)
    router.put('/client/update', validationSchema, clientCtrl.update)
    router.delete('/client/remove', clientCtrl.remove)
    router.get('/client/schema', clientCtrl.getSchema)

    return router
}

module.exports = clientRouter
    