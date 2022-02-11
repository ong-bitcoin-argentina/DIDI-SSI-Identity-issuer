/* eslint-disable camelcase */
const fetch = require('node-fetch');
const Constants = require('../constants/Constants');
const options = require('../constants/ImageOptions');
const Messages = require('../constants/Messages');

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
  missingSelfieList,
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
    return result;
  } catch (error) {
    return Messages.VUS.NEW_OPERATION;
  }
};

module.exports.cancelOperation = async function cancelOperation(params) {
  if (!params.userName) throw missingUserName;
  if (!params.operationId) throw missingOperationId;
  try {
    const result = await vuSecurityPost(
      Constants.VUS_URLS.CANCEL_OPERATION,
      JSON.stringify({
        userName: params.userName,
        operationId: params.operationId,
      }),
    );
    return result;
  } catch (error) {
    return Messages.VUS.CANCEL_OPERATION;
  }
};

module.exports.addImage = async function addImage(params) {
  if (!params.operationId) throw missingOperationId;
  if (!params.userName) throw missingUserName;
  if (!params.file) throw missingFile;
  if (!params.side) throw missingSide;

  try {
    const result = await vuSecurityPost(
      options.get(params.side),
      JSON.stringify({
        operationId: params.operationId,
        userName: params.userName,
        analyzeAnomalies: true,
        analyzeOcr: true,
        file: params.file,
      }),
    );
    return await result;
  } catch (error) {
    return Messages.VUS.ADD_IMAGE;
  }
};

module.exports.addSelfie = async function addSelfie(params) {
  if (!params.operationId) throw missingOperationId;
  if (!params.userName) throw missingUserName;
  if (!params.file) throw missingSelfieList;
  try {
    const result = await vuSecurityPost(
      Constants.VUS_URLS.ADD_SELFIE,
      JSON.stringify({
        operationId: params.operationId,
        userName: params.userName,
        selfieList: [{ file: params.file, imageType: 'SN' }],
      }),
    );
    return result;
  } catch (error) {
    return Messages.VUS.ADD_SELFIE;
  }
};
