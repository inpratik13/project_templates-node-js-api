var Auth = require('../lib/auth.js');
var Account = require('../controllers/account');
var Test = require('../controllers/test');

var controllerTrigger = function(Controller, method){
    return function(req, res){
        var c = new Controller({
            req: req,
            res: res
        });
        c[method].bind(c)();
    };
};

module.exports = function(app) {
    app.all('/*', function(req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    app.post('/login', function(req, res){
        Auth.toToken(req.headers.authorization, function(t){
            if(t){
                res.status(200).json({token: t});
            } else {
                res.status(401).end();
            }
        });
    });

    //TEST
    app.get('/test_open', controllerTrigger(Test, 'openEndpoint'));
    app.get('/test_safe_user', Auth.validator('U'), controllerTrigger(Test, 'safeEndpoint'));
    app.get('/test_safe_admin', Auth.validator('A'), controllerTrigger(Test, 'safeEndpoint'));
};
