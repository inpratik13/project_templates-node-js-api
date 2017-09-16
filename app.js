const ip = '127.0.0.1';
const port = '8000';
process.title = 'node-js-api';

var express = require('express');
var compression = require('compression');
var helmet = require('helmet');
var path = require('path');

var bodyParser = require('body-parser');

// Models
global.__base = __dirname + '/';

// Controllers
var app = express();

app.use(compression());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes/routes.js')(app);

// catch 404 and forward to error handler
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500);
    res.json({'error_code': '500', 'error_msg' : 'Internal server error!'});
});

app.use(function(req, res, next) {
    res.status(404);
    res.json({'error_code': '404', 'error_msg' : 'Resource not found!'});
});

var runServer = function() {
    app.listen(port, ip, function() {
        console.log('App listening on port ' + port + ' on ip: ' + ip);
    });
};

runServer();
