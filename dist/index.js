"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultInitializationOptions = {
    delimiter: '+'
};
var iterableRouteParamters = function (customInitializationOptions) { return function (request, response, next) {
    var initializationOptions = Object.assign({}, defaultInitializationOptions, customInitializationOptions);
    var parsedParams = {};
    for (var param in request.params) {
        var delimiter = initializationOptions.delimiter;
        var originalValue = request.params[param];
        if (originalValue.indexOf(initializationOptions.delimiter)) {
            parsedParams[param] = originalValue.split(delimiter);
        }
        else {
            parsedParams[param] = originalValue;
        }
    }
    request.parsedParams = parsedParams;
    next();
}; };
exports.default = iterableRouteParamters;
