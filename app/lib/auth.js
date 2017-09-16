var jwt = require('express-jwt');
var BASE64 = require('base-64');
var jsonwebtoken = require('jsonwebtoken');

module.exports = (function() {
    //User, Admin...ORDERD BY ROLE LEVELS
    //A = admin has all rights of U = user
    var ROLE_LEVEL = ['U','A'];
    var SECRET_KEY = "YOURsecretKEY@$#wlf";
    var JWT_OPTIONS = {
        noTimestamp: true
        //,expiresIn: "365d"
    };
    var JWT_PROVIDER = jwt({
        secret: SECRET_KEY,
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            }
            return null;
        }
    });
    var IS_ROLE_ALLOWED = function(is, expected){
        if(!expected || is === expected){
            return true;
        }

        return ROLE_LEVEL.indexOf(is) > ROLE_LEVEL.indexOf(expected);
    };
    var findUserByCredential = function(username, password){
        //IMPLEMENT YORU LOGIC TO VALIDATE CREDENTIALS AND RETURN USER OBJECT
        return {name: username, type: 'U'};
    };

    return {
        validator: function(userType) {
            return function(req, res, next) {
                JWT_PROVIDER(req, res, function(e) {
                    if(e && e.name === 'UnauthorizedError'){
                        res.status(403).end();
                        return;
                    }

                    if (req.user && IS_ROLE_ALLOWED(req.user.type, userType)) {
                        next();
                        return;
                    }

                    res.status(403).end();
                });
            };
        },

        toToken: function(authHeader, callback) {
            try {
                if (authHeader && authHeader.split(' ')[0] === 'Basic') {
                    base64 = authHeader.split(' ')[1];
                }

                if(!base64){
                    callback();
                    return;
                }

                var cred = BASE64.decode(base64).split(':');
                if(cred.length != 2){
                    callback();
                    return;
                }

                var email = cred[0], password = cred[1];
                var user = findUserByCredential(email, password);
                if(user){
                    callback(jsonwebtoken.sign(user, SECRET_KEY, JWT_OPTIONS));
                } else {
                    callback();
                }
            } catch (e) {
                callback();
            }
        }
    };

})();
