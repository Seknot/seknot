const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk')

const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc');

// Setting for local debug
const dynamoOption = process.env.NODE_ENV === "development" ? {
    region: "localhost",
    endpoint: "http://localhost:8000",
} : {};

const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOption);

// Settings for Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Seknot API',
            version: '1.0.0'
        },
    },
    apis: ['./routes/router.js'],
};

router.use('/api/docs', swaggerUi.serve);
router.get('/api/docs', swaggerUi.setup(swaggerJSDoc(swaggerOptions)));

// Ping for health check
router.get('/ping', (req, res) => {
    res.json({message: 'pong'});
});

/**
 * GET: /users ユーザー一覧取得
 */
/**
 * @swagger
 * /users:
 *   get:
 *     description: ユーザー一覧取得
 *     responses:
 *       200:
 *         description: ユーザー一覧のJSON
 */
router.get('/users', (req, res) => {
    documentClient.scan({
        TableName: 'Users'
    }).promise()
        .then((result) => res.json(result))
        .catch((e) => res.status(422).json({errors: e}));
});

/**
 * GET: /user/:userId ユーザー取得
 * @param userId 取得対象ユーザーのIDを指定
 */
router.get('/user/:userId', (req, res) => {
    // 本来はuserIdのvalidationチェックが必要
    documentClient.get({
        TableName: 'Users',
        Key: {
            id: parseInt(req.params.userId)
        }
    }).promise()
        .then((result) => res.json(result))
        .catch((e) => res.status(422).json({errors: e}));
});

/**
 * POST: /user ユーザー作成API
 * @param {req.body} { id: id, name: 名前, age: 年齢 }
 */
router.post('/user', (req, res) => {
    documentClient.put({
        TableName: 'Users',
        Item: req.body
    }).promise()
        .then((result) => res.json(result))
        .catch((e) => res.status(422).json({errors: e}));
});
module.exports = router;
