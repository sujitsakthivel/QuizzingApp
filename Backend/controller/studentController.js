var Quiz = require('../models/quiz')
var User = require('../models/user')
var Question = require('../models/question')
var Taken = require('../models/taken')
const jwt = require('jsonwebtoken')

exports.getallquiz = (req, res) => {
    Quiz.find({upload:true}, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quiz: qz });
        }
    })
}

exports.getmark = (req, res) => {
    // console.log(req);
    Taken.find({userId:req.userId}, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ mark: qz });
        }
    })
}

exports.addTaken = (req, res) => {
    console.log(req)
    var taken = new Taken({
        quizId: req.body.quizId,
        userId: req.userId,
        creatorEmail: req.body.creatorEmail,
        userEmail:req.email,
        userName:req.name,
        score: req.body.score,
        taken: true
    });

    taken.save((error, qz) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.status(200).json({ message: "yes taken added!!" })
        }
    })
}


exports.getAllQuestion = (req, res) => {

    Question.find({ quizid: req.params.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "some error!" });
        }
        else {
            res.json({ msg: qz });
        }
    })
}


exports.blockMe = (req, res) => {
    var id = req.userId
    User.updateOne({ _id: id }, { blocked: true }, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: "something went wrong!!" })
        }
        else {
            console.log("blocked user");
            res.status(201).json({ message: "blocked user!" });
        }
    })

}

exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("unauthorized req")
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);  
    if (token == 'null') {
        return res.status(401).send("unauthorized req")
    }
    let payload = jwt.verify(token, 'secretkey')
    if (!payload) {
        return res.status(401).send("unauthorized req")
    }
    // console.log("in middleware");
    // console.log(payload.subject);
    // console.log(payload.email);
    // console.log(payload);
    req.userId = payload.subject
    req.email = payload.email;
    req.name = payload.name;
    // console.log(req.userId);
    // console.log(req.email);
    next()
}