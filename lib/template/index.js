function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var stick_1 = require('../stick');
__export(require('./template.view'));
var controller_1 = require('./components/controller');
var repeat_1 = require('./components/repeat');
stick_1.component('controller', ['$container', controller_1.Controller]);
stick_1.component('repeat', repeat_1.Repeat);
__export(require('./components/base-component'));
