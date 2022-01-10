'use strict';

/**
 * システム応答確認
 * サービスの応答確認用
 *
 * no response value expected for this operation
 **/
module.exports.handler = async (event, context, callback) => {
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            status: 'OK',
            time: (new Date()).getTime()
        }),
    });
};
