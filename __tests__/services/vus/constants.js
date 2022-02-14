const addImageParams = {
  operationId: 'operationId',
  userName: 'userName',
  file: 'file',
  side: 'back',
};

const cancelOperationParams = {
  operationId: 'operationId',
  userName: 'userName',
};

const newOperationParams = {
  userName: 'userName',
  deviceHash: 'deviceHash',
  rooted: 'rooted',
  operativeSystem: 'operativeSystem',
  operativeSystemVersion: 'operativeSystemVersion',
  deviceManufacturer: 'deviceManufacturer',
  deviceName: 'deviceName',
};

module.exports = { addImageParams, cancelOperationParams, newOperationParams };
