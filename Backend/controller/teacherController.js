var Quiz = require('../models/quiz')
var User = require('../models/user')
var Taken = require('../models/taken')
var Question = require('../models/question')
const jwt = require('jsonwebtoken')

exports.createQuiz = (req, res) => {
    // console.log(req)
    whoid = req.userId;
    whoemail = req.email
    var quiz = new Quiz({
        quizname: req.body.quizname,
        quizdescription: req.body.description,
        owner: whoid,
        owneremail: whoemail
    });
    quiz.save((error, qz) => {
        if (error) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {

            res.status(200).json({ message: "yes quiz added!!" })
        }
    })
}

exports.getUploadquiz = (req, res) => {
    Quiz.find({ owner: req.userId, upload: false }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quiz: qz });
        }
    })
}

exports.seeStudent = (req, res) => {
    User.find({ role: "student" }, (err, usr) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ user: usr });
        }
    })
}

exports.blockStudent = (req, res) => {
    var id = req.params.id
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
exports.unblockStudent = (req, res) => {
    var id = req.params.id
    User.updateOne({ _id: id }, { blocked: false }, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ msg: "something went wrong!!" })
        }
        else {
            console.log("unblocked user");
            res.status(201).json({ message: "unblocked user!" });
        }
    })
}
exports.addQuestion = (req, res) => {

    Question.find({ quizid: req.body.quizid }, (err, q) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            var question = new Question({
                quizid: req.body.quizid,
                questionId: q.length + 1,
                questionText: req.body.questionText,
                answer: req.body.answer,
                options: req.body.options
            });

            question.save((error, qsn) => {
                if (error) {
                    console.log(error);
                    res.json({ msg: "some error!" });
                }
                else {
                    res.status(200).json({ message: "yes question added!!" })
                }
            })
        }
    })
}

exports.uploadQuiz = (req, res) => {
    console.log("upload back");
    console.log(req.body);
    Question.find({ quizid: req.body.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            console.log(qz.length);
            if (qz.length < 5) {
                res.json({ msg: "You must have 5 question in the quiz for upload quiz!!" });
            }
            else {
                Quiz.updateOne({ _id: req.body.id }, { upload: true }, function (err, user) {
                    if (err) {
                        console.log(err)
                        res.json({ msg: "something went wrong!!" })
                    }
                    else {
                        const io = req.app.get('io');
                        io.emit("quizcrud", "Quiz Curd done here");
                        res.json({ message: "quiz uploaded!" });
                    }
                })

            }

        }
    })

}

exports.publish = (req, res) => {
    console.log(req.body);
    Taken.find({ quizId: req.body.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            Taken.updateOne({ quizId: req.body.id }, { published: true }, function (err, user) {
                    if (err) {
                        console.log(err)
                        res.json({ msg: "something went wrong!!" })
                    }
                    else {
                        const io = req.app.get('io');
                        io.emit("quizcrud", "Quiz Curd done here");
                        res.json({ message: "published!" });
                    }
                })
        }
    })

}
exports.editQuiz = (req, res) => {
    console.log("unupload back");
    console.log(req.body);
    Question.find({ quizid: req.body.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            console.log(qz.length);

                Quiz.updateOne({ _id: req.body.id }, { upload: false }, function (err, user) {
                    if (err) {
                        console.log(err)
                        res.json({ msg: "something went wrong!!" })
                    }
                    else {
                        const io = req.app.get('io');
                        io.emit("quizcrud", "Quiz Curd done here");
                        res.json({ message: "quiz uploaded!" });
                    }
                })
        }
    })
}

exports.editQuiz2 = (req, res) => {
    console.log("req");
    console.log(req.body);
    Question.find({ quizid: req.body.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            console.log(qz.length);

                Quiz.updateOne({_id:req.body.id},{$set: { quizname: req.body.quizname , quizdescription: req.body.quizdescription}}, function (err, user) {
                    if (err) {
                        console.log(err)
                        res.json({ msg: "something went wrong!!" })
                    }
                    else {
                        const io = req.app.get('io');
                        io.emit("quizcrud", "Quiz Curd done here");
                        res.json({ message: "quiz uploaded!" });
                    }
                })
            }
    })
}

exports.deleteQuiz = (req, res) => {
    var id = req.params.id
    // console.log(req.params.id);
    Quiz.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete by admin");
        }
    })
    Question.deleteMany({ quizid: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete by admin");
        }
    })
    const io = req.app.get('io');
    io.emit("quizcrud", "Quiz Curd done here");
    res.status(200).json({ msg: "yes deleted user by admin" })
}


exports.getHomequiz = (req, res) => {
    Quiz.find({ owner: req.userId, upload: true }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ quiz: qz });
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

exports.getquiz = (req, res) => {
    console.log(req);
    Quiz.find({ _id: req.params.id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "some error!" });
        }
        else {
            res.json({ msg: qz });
        }
    })
}

exports.getmark = (req, res) => {
    // console.log(req);
    Taken.find({creatorEmail:req.email}, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ msg: "some error!" });
        }
        else {
            res.json({ mark: qz });
        }
    })
}

exports.getQuestion = (req, res) => {
    var id = req.params.id
    Question.find({ _id: id }, (err, qz) => {
        if (err) {
            console.log(error);
            res.json({ errormsg: "some error!" });
        }
        else {
            console.log({ msg: qz });
            res.json({ msg: qz });
        }
    })
}

exports.deleteQuestion = (req, res) => {
    var id = req.params.id
    Question.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.json({ msg: "Somthing went wrong!!" });
            console.log("err in delete  question by admin");
        }
    })
    res.json({ msg: "yes deleted user by admin" })
}

exports.editQuestion = (req, res) => {
    Question.updateOne({_id:req.body.questionid},{$set: { questionText: req.body.questionText , answer: req.body.answer ,
        options: req.body.options}}, function (err, user) {
                    console.log(1);
                    if (err) {
                        console.log(err)
                        res.json({ msg: "Somthing went wrong" });
                    }
                    else {
                        res.json({ message: "question updated!!" });
                    }
                });
    // Question.find({ quizid: req.body.quizid }, (err, q) => {
    //     if (err) {
    //         console.log(error);
    //         res.json({ msg: "some error!" });
    //     }
    //     else {
    //         var question = new Question({
    //             quizid: req.body.quizid,
    //             questionId: q.length + 1,
    //             questionText: req.body.questionText,
    //             answer: req.body.answer,
    //             options: req.body.options
    //         });

    //         question.save((error, qsn) => {
    //             if (error) {
    //                 console.log(error);
    //                 res.json({ msg: "some error!" });
    //             }
    //             else {
    //                 res.status(200).json({ message: "yes question added!!" })
    //             }
    //         })
    //     }
    // })
}

exports.resestPasswordDone = (req, res) => {
    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            console.log(err)
            res.json({ msg: "Somthing went wrong" });
        }
        else {
            if (!user) {
                res.json({ msg: 'User does not exist with this email!!' })
            }
            else {
                Otp.findOne({ email: req.body.email }, async (err, otps) => {

                    if (err) {
                        res.json({ msg: "Somthing went wrong" });
                    }
                    if (!otps) {
                        res.json({ msg: "Somthing went wrong" });
                    }
                    else {
                        var otp = otps.otp;
                        if (otp != req.body.otp) {
                            res.json({ msg: "Invalid Otp!!!" });
                        }
                        else {
                            var p = User.hashPassword(req.body.p1)
                            var x = await getEmail(req.body.email)
                            User.updateOne({ email: req.body.email },
                                { password: p }, function (err, user) {
                                    console.log(1);
                                    if (err) {
                                        console.log(err)
                                        res.json({ msg: "Somthing went wrong" });
                                    }
                                    else {
                                        res.json({ message: "password updated!!" });
                                    }
                                });
                        }
                    }
                })


            }
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
    req.userId = payload.subject
    req.email = payload.email;
    req.name = payload.name;
    // console.log(req.userId);
    // console.log(req.email);
    next()
}