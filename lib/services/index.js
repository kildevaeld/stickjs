function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./router/index'));
__export(require('./http'));
__export(require('./template'));
