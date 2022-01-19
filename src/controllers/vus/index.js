const vusService = require('../../services/vusService');

const createVerification = async (req, res) => {
  const {
    userName,
    ipAddress,
    deviceHash,
    rooted,
    applicationVersion,
    operativeSystem,
    operativeSystemVersion,
    deviceManufacturer,
    deviceName,
  } = req.body;

  let operationId;
  try {
    // Iniciar pedido de validación de identidad con vu security
    // eslint-disable-next-line no-unused-vars
    operationId = await vusService.newOperation(
      userName,
      ipAddress,
      deviceHash,
      rooted,
      applicationVersion,
      operativeSystem,
      operativeSystemVersion,
      deviceManufacturer,
      deviceName,
    );
    return res.status(200).send('Updated post successfuly');
  } catch (err) {
    return 'error';
  }
};

module.exports = {
  createVerification,
};
