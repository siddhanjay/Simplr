"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Runs the value through a list of validators. As soon as a validation error is detected, the error is returned
 */
function applyValidators(value, validators) {
    return new Promise(function (resolve) {
        var currentIndex = 0;
        var gotoNextValidator = function () {
            currentIndex++;
            runCurrentValidator();
        };
        var runCurrentValidator = function () {
            if (currentIndex == validators.length) {
                resolve(null);
                return;
            }
            var validator = validators[currentIndex];
            var res = validator(value);
            // no error
            if (!res) {
                gotoNextValidator();
                return;
            }
            // some error
            if (!res.then) {
                resolve(res);
                return;
            }
            // wait for error response
            res.then(function (msg) {
                if (!msg)
                    gotoNextValidator();
                else
                    resolve(msg);
            });
        };
        // kickoff
        runCurrentValidator();
    });
}
exports.applyValidators = applyValidators;
