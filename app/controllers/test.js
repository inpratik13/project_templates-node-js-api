'use strict';

module.exports = function(options) {
    this.res = options.res;
    this.req = options.req;

    var self = this;
    this.openEndpoint = function() {
        self.res.json({'endpoint': 'open'});
    };
    this.safeEndpoint = function() {
        self.res.json({'endpoint': 'safe'});
    };
};
