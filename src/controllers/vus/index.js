const vusService = require('../../services/vusService');

const createVerification = async (req, res) => {
  const { userName } = req.body;
  const { ipAddress } = req.body;
  const { deviceHash } = req.body;
  const { rooted } = req.body;
  const { applicationVersion } = req.body;
  const { operativeSystem } = req.body;
  const { operativeSystemVersion } = req.body;
  const { deviceManufacturer } = req.body;
  const { deviceName } = req.body;

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
