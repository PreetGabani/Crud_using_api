require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const cors = require("cors")

const mongoose = require('mongoose');

const Employee = mongoose.model('Employee');


const employeeController = require('./controllers/employeeController');
var app = express();
app.use(cors())

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

    next();
});

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(8000, () => {
    console.log('Express server started at port : 8000');
});

app.use('/employee', employeeController);



app.post('/employee/add', (req, res) => {
    console.log(req.body)
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.send({ message: "Employee added" })
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.send({
                    employee: req.body
                });
            }
            else
                res.send({ Err: 'Error during record insertion : ' });
        }
    });
});


app.post("/employee/update", (req, res) => {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.send({ message: "Record updated" }); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.send({
                    employee: req.body
                });
            }
            else {
                console.log(err)
                res.send({ "Error": 'Error during record update : ' });
            }

        }
    });
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}