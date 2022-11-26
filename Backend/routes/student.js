var express = require('express')
var router = express.Router()
const studentController  = require('../controller/studentController')


router.get('/getallquiz',studentController.verifyToken,studentController.getallquiz)
router.get('/getmark',studentController.verifyToken,studentController.getmark)
router.get('/getallquestion/:id',studentController.verifyToken,studentController.getAllQuestion)
router.post('/addTaken',studentController.verifyToken,studentController.addTaken)
router.put('/blockme',studentController.verifyToken,studentController.blockMe)
module.exports = router
