var mongoose = require('mongoose')
var takenSchema = mongoose.Schema({
    quizId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    creatorEmail: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    taken: {
        type: Boolean,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('taken',takenSchema)

