'use strict';

module.exports.hello = async (event) => {
    return {
        message: "Welcome",
        event
    }
};
