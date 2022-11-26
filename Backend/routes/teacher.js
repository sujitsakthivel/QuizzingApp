var express = require('express')
var router = express.Router()
const teacherController  = require('../controller/teacherController')




router.post('/createquiz',teacherController.verifyToken,teacherController.createQuiz)
router.get('/getuploadquiz',teacherController.verifyToken,teacherController.getUploadquiz)
router.get('/gethomequiz',teacherController.verifyToken,teacherController.getHomequiz)
router.get('/seestudent',teacherController.verifyToken,teacherController.seeStudent)
router.delete('/blockuser/:id',teacherController.verifyToken,teacherController.blockStudent)
router.delete('/unblockuser/:id',teacherController.verifyToken,teacherController.unblockStudent)
router.delete('/deletequiz/:id',teacherController.verifyToken,teacherController.deleteQuiz)
router.post('/uploadquiz',teacherController.verifyToken,teacherController.uploadQuiz)
router.post('/publish',teacherController.verifyToken,teacherController.publish)
router.post('/editquiz',teacherController.verifyToken,teacherController.editQuiz)
router.post('/editquiz2',teacherController.verifyToken,teacherController.editQuiz2)
router.get('/getquiz/:id',teacherController.verifyToken,teacherController.getquiz)
router.post('/addquestion',teacherController.verifyToken,teacherController.addQuestion)
router.get('/getallquestion/:id',teacherController.verifyToken,teacherController.getAllQuestion)
router.delete('/deletequestion/:id',teacherController.verifyToken,teacherController.deleteQuestion)
router.get('/getmark',teacherController.verifyToken,teacherController.getmark)
// router.put('/editquestion',teacherController.verifyToken,teacherController.editQuestion)
router.post('/editquestion',teacherController.verifyToken,teacherController.editQuestion)
module.exports = router
