const { CronJob } = require('cron');
const ValidatedData = require('../models/ValidatedData');
const { createAndEmmitCredential } = require('./credentialActions');

const {
  PERSONAL_TEMPLATE_ID,
  LOCATION_TEMPLATE_ID,
  DEBUG,
} = require('../constants/Constants');

//                    ┌────────────── second (optional)
//                    │ ┌──────────── minute
//                    │ │ ┌────────── hour
//                    │ │ │ ┌──────── day of month
//                    │ │ │ │ ┌────── month
//                    │ │ │ │ │ ┌──── day of week
//                    │ │ │ │ │ │
//                    │ │ │ │ │ │
//                    * * * * * *
const FREQUENCY = '*/10 * * * * *';

const processValidatedData = async (credentialType) => {
  const validatedData = await ValidatedData.find({
    status: 'Pending',
  })
    .sort({ createdOn: -1 })
    .limit(1);
  // eslint-disable-next-line no-console
  if (DEBUG) console.log({ validatedData });

  if (validatedData.length > 0) {
    const { did, personalData, locationData, _id: id } = validatedData[0];
    try {
      const template = personalData
        ? PERSONAL_TEMPLATE_ID
        : LOCATION_TEMPLATE_ID;
      const credentials = await createAndEmmitCredential(
        did,
        personalData || locationData,
        template,
      );
      if (credentials) await ValidatedData.deleteOne({ _id: id });
    } catch (error) {
      error.credential = credentialType;
      await validatedData[0].addAttempt(error);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
};

const Job = (funct) => {
  const job = new CronJob(
    FREQUENCY,
    funct,
    null,
    true,
    'America/Argentina/Buenos_Aires',
    false,
    true,
  );
  job.start();
};

exports.permanentJob = () => {
  Job(processValidatedData);
};
