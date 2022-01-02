
var serverlessSDK = require('./serverless_sdk/index.js');
serverlessSDK = new serverlessSDK({
  orgId: 'kou3141',
  applicationName: 'hackcoin-api-aws',
  appUid: 'cnLQj5CnxyD3ZQYV7S',
  orgUid: 'b6238b1f-df1a-4213-8390-51e0abd4a734',
  deploymentUid: '532c9500-4fb8-4dcc-847a-ee7a1d177547',
  serviceName: 'seknot-api',
  shouldLogMeta: true,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '5.4.4',
  disableFrameworksInstrumentation: false
});

const handlerWrapperArgs = { functionName: 'seknot-api-dev-serverlessTest', timeout: 6 };

try {
  const userHandler = require('./lambda.js');
  module.exports.handler = serverlessSDK.handler(userHandler.handler, handlerWrapperArgs);
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => { throw error }, handlerWrapperArgs);
}