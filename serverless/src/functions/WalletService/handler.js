'use strict';

const {documentClient} = require('./dynamoDB')

module.exports.handler = async (event, context, callback) => {
    console.log(event);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            status: 'OK',
            time: (new Date()).getTime()
        }),
    });
};
