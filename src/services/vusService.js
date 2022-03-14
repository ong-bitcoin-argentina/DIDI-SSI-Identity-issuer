/* eslint-disable camelcase */
const fetch = require('node-fetch');

const Constants = require('../constants/Constants');
const options = require('../constants/urlOptions');
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

function validateCommonParams(params) {
  if (!params.userName) throw missingUserName;
  if (!params.operationId) throw missingOperationId;
}

/**
 *  Realiza un post al servicio de vuSecurity con la url interna y el body recibidos
 */
const vuSecurityPost = async function vuSecurityPost(params) {
  const url = await options.get(params.url);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-apikey-private': Constants.VUS_API_KEY_PRIVATE,
    },
    body: params.body,
    url,
  });
  const jsronResp = await response.json();
  if (response.status === 400) throw jsronResp;
  return jsronResp;
};

module.exports.newOperation = async function newOperation(params) {
  if (!params.userName) throw missingUserName;
  if (!params.deviceHash) throw missingDeviceHash;
  if (!params.operativeSystem) throw missingOperativeSystem;
  if (!params.operativeSystemVersion) throw missingOperativeSystemVersion;
  if (!params.deviceManufacturer) throw missingDeviceManufacturer;
  if (!params.deviceName) throw missingDeviceName;
  try {
    const result = await vuSecurityPost({
      url: 'create',
      body: JSON.stringify({
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
    });
    if (!result) throw Messages.VUS.OPERATION_FAIL;
    result.userName = params.userName;
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

module.exports.addImage = async function addImage(params) {
  validateCommonParams(params);
  if (!params.file) throw missingFile;
  if (!params.side) throw missingSide;
  try {
    const response = await vuSecurityPost({
      url: params.side,
      body: JSON.stringify({
        operationId: params.operationId,
        userName: params.userName,
        analyzeAnomalies: true,
        analyzeOcr: true,
        file: params.file,
      }),
    });
    if (!response) throw Messages.VUS.OPERATION_FAIL;
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

module.exports.addSelfie = async function addSelfie(params) {
  validateCommonParams(params);
  if (!params.file) throw missingSelfieList;
  try {
    const response = await vuSecurityPost({
      url: 'selfie',
      body: JSON.stringify({
        operationId: params.operationId,
        userName: params.userName,
        selfieList: [{ file: params.file, imageType: 'SN' }],
      }),
    });
    if (!response) throw Messages.VUS.OPERATION_FAIL;
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

// OPERACION SIMPLE: consultas por userName y operationId
module.exports.simpleOperation = async function simpleOperation(params) {
  validateCommonParams(params);
  try {
    return vuSecurityPost({
      url: params.operation,
      body: JSON.stringify({
        userName: params.userName,
        operationId: params.operationId,
      }),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
