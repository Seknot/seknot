/*
    AWS DynamoDB Instance
 */

// Setting for local debug
const AWS = require("aws-sdk");
const dynamoOption = process.env.NODE_ENV === "development" ? {
    region: "localhost",
    endpoint: "http://localhost:8000",
} : {};

exports.documentClient = new AWS.DynamoDB.DocumentClient(dynamoOption);
