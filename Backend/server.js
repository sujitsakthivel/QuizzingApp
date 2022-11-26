const express = require('express')
const app = express()
var cors = require('cors')
// var bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

var apiRoutes = require('./routes/api')
var teacherRoutes = require('./routes/teacher')
var studentRoutes = require('./routes/student')
var adminRoutes = require('./routes/admin')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

const db = require('./database/db');
db()
var server = require('http').Server(app);
var io = require('socket.io')(server,
    {
        cors:
        {
            origin: '*',
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
app.set('io', io);
io.on('connection', socket => {

    console.log("new  sockeet connection...");
    socket.emit("test event", "hey utsav");

});


app.get('/', (req, res) => {
    res.send("Hello Utsav from quiz Server")
})


app.use('/', apiRoutes)
app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


