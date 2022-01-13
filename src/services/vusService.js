const fetch = require('node-fetch');
const Constants = require('../constants/Constants');
const Messages = require('../constants/Messages');

const {
  missingUserName,
  missingIpAddress,
  missingDeviceHash,
  missingRooted,
  missingApplicationVersion,
  missingOperativeSystem,
  missingOperativeSystemVersion,
  missingDeviceManufacturer,
  missingDeviceName,
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

    const jsonResp = await response.json();
    return jsonResp;
  } catch (err) {
    return err;
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
  if (!rooted) throw missingRooted;
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
    return result.operationId;
  } catch (err) {
    return Messages.VUS.NEW_OPERATION;
  }
};
