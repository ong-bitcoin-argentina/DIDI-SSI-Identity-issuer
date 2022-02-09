/* eslint-disable camelcase */
const fetch = require('node-fetch');
const Constants = require('../constants/Constants');
const Messages = require('../constants/Messages');
const options = require('../constants/ImageOptions');

const {
  missingUserName,
  missingIpAddress,
  missingDeviceHash,
  missingApplicationVersion,
  missingOperativeSystem,
  missingOperativeSystemVersion,
  missingDeviceManufacturer,
  missingDeviceName,
  missingOperationId,
  missingFile,
  missingSide,
} = require('../constants/serviceErrors');

/**
 *  Realiza un post al servicio de vuSecurity con la url interna y el body recibidos
 */
const vuSecurityPost = async function vuSecurityPost(url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-apikey': Constants.VUS_API_KEY,
      },
      body,
      url,
    });
    return response.status === 400
      ? Promise.reject(response.json())
      : Promise.resolve(response.json());
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.newOperation = async function newOperation(
  userName,
  ipAddress,
  deviceHash,
  rooted,
  applicationVersion,
  operativeSystem,
  operativeSystemVersion,
  deviceManufacturer,
  deviceName,
) {
  if (!userName) throw missingUserName;
  if (!ipAddress) throw missingIpAddress;
  if (!deviceHash) throw missingDeviceHash;
  if (!applicationVersion) throw missingApplicationVersion;
  if (!operativeSystem) throw missingOperativeSystem;
  if (!operativeSystemVersion) throw missingOperativeSystemVersion;
  if (!deviceManufacturer) throw missingDeviceManufacturer;
  if (!deviceName) throw missingDeviceName;
  try {
    const result = await vuSecurityPost(
      Constants.VUS_URLS.NEW_OPERATION,
      JSON.stringify({
        userName,
        ipAddress,
        deviceHash,
        rooted,
        applicationVersion: Constants.VUS_APP_VERS,
        operativeSystem,
        operativeSystemVersion,
        deviceManufacturer,
        deviceName,
      }),
    );
    result.userName = userName;
    return Promise.resolve(result);
  } catch (err) {
    return Promise.reject(Messages.VUS.NEW_OPERATION);
  }
};

module.exports.cancelOperation = async function cancelOperation(
  userName,
  operationId,
) {
  if (!userName) throw missingUserName;
  if (!operationId) throw missingOperationId;
  try {
    const result = await vuSecurityPost(
      Constants.VUS_URLS.CANCEL_OPERATION,
      JSON.stringify({
        userName,
        operationId,
      }),
    );
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(Messages.VUS.CANCEL_OPERATION);
  }
};

module.exports.addImage = async function addImage(
  operationId,
  userName,
  file,
  side,
) {
  if (!operationId) throw missingOperationId;
  if (!userName) throw missingUserName;
  if (!file) throw missingFile;
  if (!side) throw missingSide;

  try {
    const result = await vuSecurityPost(
      options.get(side),
      JSON.stringify({
        operationId,
        userName,
        analyzeAnomalies: true,
        analyzeOcr: true,
        file,
      }),
    );
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(Messages.VUS.ADD_IMAGE);
  }
};
