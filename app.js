//_______________________________________________________BEGIN setup

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var fs = require("fs");

var expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({
    extname: 'hbs'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')))




var docs = {
    fullName: undefined,
    address: undefined,
    payPalEmail: undefined,
    startDate: undefined,
    endDate: undefined,
    totalHours: undefined,
    totalPayment: undefined,
    entries: []
}




var date = new Date();
var currentDate = (date.getUTCMonth() + 1) + "_" + date.getUTCDate() + "_" + date.getFullYear();
var pdfName = "public/invoices/invoice_" + currentDate + ".pdf";






//_______________________________________________________END setup



//_______________________________________________________BEGIN Read ( render ) invoice items to home page




app.get('/', function(req, res) {


    res.render('index', {
        item: docs
    });

});






//_______________________________________________________END Read ( render ) invoice items to home page


//_______________________________________________________BEGIN Send invoice data to Mongoose/Mongo


app.post('/', function(req, res) {

    var childArgs = [
        path.join(__dirname, 'phantomjs-script.js'),
        'some other argument (passed to phantomjs script)'
    ]

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        // handle results
    })

    docs = req.body;



    res.redirect('/');



});

app.get('/download', function(req, res) {
    var date = new Date();
    var currentDate = (date.getUTCMonth() + 1) + "_" + date.getUTCDate() + "_" + date.getFullYear();
    var pdfName = "public/invoices/invoice_" + currentDate + ".pdf";

    res.download(pdfName, pdfName);

    var path = "public/invoices/invoice_" + currentDate + ".json";
    var data = JSON.stringify(docs)

    fs.writeFile(path, data, function(error) {
        if (error) {
            console.error("write error:  " + error.message);
        } else {
            console.log("Successful Write to " + path);
        }
    });
});

//_______________________________________________________END Send invoice data to Mongoose/Mongo







//_______________________________________________________BEGIN start server

app.listen(3000, function(err) {
    if (err) {
        console.log('server is fucked ');
    } else {
        console.log('server works...I hope ')
    }
})
//_______________________________________________________END start server