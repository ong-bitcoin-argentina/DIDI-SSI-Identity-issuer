const addBackParams = {
  operationId: 'operationId',
  userName: 'userName',
  side: 'back',
  file: 'fileBack',
};

const addFrontParams = {
  operationId: 'operationId',
  userName: 'userName',
  side: 'front',
  file: 'fileFront',
};

const simpleOperationParams = {
  operationId: 'operationId',
  userName: 'userName',
};

const newOperationParams = {
  userName: 'userName',
  deviceHash: 'deviceHash',
  ipAddress: '127.0.0.1',
  rooted: 'rooted',
  operativeSystem: 'operativeSystem',
  operativeSystemVersion: 'operativeSystemVersion',
  deviceManufacturer: 'deviceManufacturer',
  deviceName: 'deviceName',
  url: 'create',
};

module.exports = {
  addBackParams,
  addFrontParams,
  simpleOperationParams,
  newOperationParams,
};
