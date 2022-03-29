const { CronJob } = require('cron');
const ValidatedData = require('../models/ValidatedData');
const { createAndEmmitCredentials } = require('./credentialActions');

const FREQUENCY = '0 */1 * * * *'; // Frecuencia de 1 minuto

const processValidatedData = async () => {
  // Se ejecutan de a 1
  const validatedData = await ValidatedData.find({
    status: 'Pending',
  })
    .sort({ createdOn: -1 })
    .limit(1);
  // eslint-disable-next-line no-console
  console.log({ validatedData });
  if (validatedData.length > 0) {
    const { did, userData, _id: id } = validatedData[0];
    try {
      const credentials = await createAndEmmitCredentials(did, userData);
      if (credentials) await ValidatedData.deleteOne({ _id: id });
    } catch (error) {
      await validatedData[0].addAttempt(error);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

const validatedDataJob = (frequency) => {
  const job = new CronJob(
    frequency,
    processValidatedData,
    null,
    true,
    'America/Argentina/Buenos_Aires',
    false,
    true,
  );
  job.start();
};

exports.permanentJob = () => {
  validatedDataJob(FREQUENCY);
};
