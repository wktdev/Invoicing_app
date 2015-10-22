//_______________________________________________________BEGIN setup

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

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




// app code




//_______________________________________________________END setup



//_______________________________________________________BEGIN Read ( render ) invoice items to home page




app.get('/', function(req, res) {


    res.render('index', {
        item: docs
    });

});



app.get('/json', function(req, res) {

    Invoice.find({}).sort('-date').exec(function(err, docs) {
        return res.end(JSON.stringify(docs.slice(-1)[0]));
        console.log(docs.slice(-1)[0]);
        res.render('index', {
            item: docs.slice(-1)[0]
        });

    });



})



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
    res.download('public/invoice/item.pdf', 'public/invoice/item.pdf');
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