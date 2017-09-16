'use strict';

module.exports = function(options) {
    this.res = options.res;
    this.req = options.req;

    var self = this;
    this.signup = function() {
        var account = self.req.body;
        //VALUDATE ACCOUNT AND GIVE APPROPRIATE RESPONSE
        /*if(!account || !account.email){
            logger.error("Request without account/email");
            self.res.status(400).end();
            return;
        }*/

        //ON SUCCESS
        self.res.status(201).end();
    };
};
