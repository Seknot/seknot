// ローカル環境のDynamoDBテーブル作成
const AWS = require("aws-sdk");

AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000",
});

const dynamoDB = new AWS.DynamoDB();

dynamoDB.createTable(
    {
        "TableName": "Users",
        "AttributeDefinitions": [
            {
                "AttributeName": "id",
                "AttributeType": "S"
            }
        ],
        "KeySchema": [
            {
                "AttributeName": "id",
                "KeyType": "HASH"
            }
        ],
        "ProvisionedThroughput": {
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
        }
    }
    , (err, data) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
        }
    })

dynamoDB.createTable(
    {
        TableName: "Wallets",
        KeySchema: [
            {AttributeName: "address", KeyType: "HASH"}
        ],
        AttributeDefinitions: [
            {AttributeName: "address", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }
    , (err, data) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
        }
    })

dynamoDB.createTable(
    {
        TableName: "Tokens",
        KeySchema: [
            {AttributeName: "id", KeyType: "HASH"}
        ],
        AttributeDefinitions: [
            {AttributeName: "id", AttributeType: "S"}
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }
    , (err, data) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
        }
    })
