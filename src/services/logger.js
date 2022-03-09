const {
  LoggerManager,
  AzureLogger,
} = require('@proyecto-didi/didi-ssi-logger');
const {
  NAME,
  ENVIRONMENT,
  DISABLE_TELEMETRY_CLIENT,
  APP_INSIGTHS_IKEY,
} = require('../constants/Constants');

/**
 * LogIn en Azure
 */
const loggerManager = new LoggerManager();
const azureLogger = new AzureLogger({
  aiCloudRole: NAME,
  aiCloudRoleInstance: ENVIRONMENT,
  disableAppInsights: DISABLE_TELEMETRY_CLIENT,
  environment: ENVIRONMENT,
  ikey: APP_INSIGTHS_IKEY,
});

loggerManager.addLogger('azure', azureLogger);

module.exports = {
  loggerManager,
};
