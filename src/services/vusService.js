/* eslint-disable camelcase */
const fetch = require('node-fetch');

const Constants = require('../constants/Constants');
const options = require('../constants/ImageOptions');
const Messages = require('../constants/Messages');

const {
  missingUserName,
  missingDeviceHash,
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
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-apikey': Constants.VUS_API_KEY,
    },
    body,
    url,
  });
  if (response.status === 400) throw response.json();
  return response.json();
};

module.exports.newOperation = async function newOperation(params) {
  if (!params.userName) throw missingUserName;
  if (!params.deviceHash) throw missingDeviceHash;
  if (!params.operativeSystem) throw missingOperativeSystem;
  if (!params.operativeSystemVersion) throw missingOperativeSystemVersion;
  if (!params.deviceManufacturer) throw missingDeviceManufacturer;
  if (!params.deviceName) throw missingDeviceName;
  try {
    const result = await vuSecurityPost(
      Constants.VUS_URLS.NEW_OPERATION,
      JSON.stringify({
        userName: params.userName,
        ipAddress: Constants.IP_ADDRESS,
        deviceHash: params.deviceHash,
        rooted: params.rooted,
        applicationVersion: Constants.VUS_APP_VERS,
        operativeSystem: params.operativeSystem,
        operativeSystemVersion: params.operativeSystemVersion,
        deviceManufacturer: params.deviceManufacturer,
        deviceName: params.deviceName,
      }),
      params.userName,
    );
    if (!result) throw Messages.VUS.OPERATION_FAIL;
    result.userName = params.userName;
    return result;
  } catch (error) {
    throw Messages.VUS.NEW_OPERATION;
  }
};

module.exports.addImage = async function addImage(params) {
  if (!params.operationId) throw missingOperationId;
  if (!params.userName) throw missingUserName;
  if (!params.file) throw missingFile;
  if (!params.side) throw missingSide;
  try {
    const response = await vuSecurityPost(
      options.get(params.side),
      JSON.stringify({
        operationId: params.operationId,
        userName: params.userName,
        analyzeAnomalies: true,
        analyzeOcr: true,
        file: params.file,
      }),
      params.userName,
    );
    if (!response) throw Messages.VUS.OPERATION_FAIL;
    return response;
  } catch (error) {
    throw Messages.VUS.ADD_IMAGE;
  }
};

module.exports.addSelfie = async function addSelfie(params) {
  if (!params.operationId) throw missingOperationId;
  if (!params.userName) throw missingUserName;
  if (!params.file) throw missingSelfieList;
  try {
    const response = await vuSecurityPost(
      Constants.VUS_URLS.ADD_SELFIE,
      JSON.stringify({
        operationId: params.operationId,
        userName: params.userName,
        selfieList: [{ file: params.file, imageType: 'SN' }],
      }),
      params.userName,
    );
    if (!response) throw Messages.VUS.OPERATION_FAIL;
    return response;
  } catch (error) {
    throw Messages.VUS.ADD_SELFIE;
  }
};

// OPERACION SIMPLE: consultas por userName y operationId
module.exports.simpleOperation = async function simpleOperation(params, url) {
  if (!params.userName) throw missingUserName;
  if (!params.operationId) throw missingOperationId;
  try {
    const response = await vuSecurityPost(
      url,
      JSON.stringify({
        userName: params.userName,
        operationId: params.operationId,
      }),
      params.userName,
    );
    if (!response) throw Messages.VUS.OPERATION_FAIL;
    return response;
  } catch (error) {
    throw Messages.VUS.SIMPLE_OPERATION;
  }
};
