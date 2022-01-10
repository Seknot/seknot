'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-northeast-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const docClientGet = (params) => {
    return new Promise((resolve, reject) => {
        docClient.get(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function hello(event) {
    const data = await docClientGet({
        TableName: 'user',
        Key: {'id': '1'}
    });

    const user = data.Item;

    return {
        statusCode: 200,
        body: JSON.stringify({
            id: user.id,
            name: user.name
        })
    };
}

(async () => {
    console.log(await hello())
})();
