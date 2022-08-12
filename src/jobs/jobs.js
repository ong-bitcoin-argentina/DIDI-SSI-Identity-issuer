const { CronJob } = require('cron');
const jsonwebtoken = require('jsonwebtoken');

const ValidatedData = require('../models/ValidatedData');
const { createAndEmmitCredential } = require('./credentialActions');

const {
  DEBUG,
  ISSUER_SERVER_PRIVATE_KEY,
  ISSUER_USER,
  ISSUER_PASSWORD,
} = require('../constants/Constants');
const {
  getPesonalTemplateId,
  getLocationTemplateId,
  updateToken,
} = require('../models/Admin');
const { login } = require('../services/IssuerService');
const Admin = require('../models/Admin');

const now = function now() {
  return Math.floor(Date.now() / 1000);
};

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
        ? await getPesonalTemplateId()
        : await getLocationTemplateId();
      // VERIFICO QUE EL TOKEN ACTUAL ESTE VIGENTE (deberia haber un solo admin en la coleccion Admin)
      let { jwt } = await Admin.findOne();
      const decoded = jsonwebtoken.verify(jwt, ISSUER_SERVER_PRIVATE_KEY);
      if (!decoded.exp && decoded.exp > now()) {
        // NO ESTA MAS VIGENTE
        jwt = await login(ISSUER_USER, ISSUER_PASSWORD);
        await updateToken(jwt);
      }

      const credentials = await createAndEmmitCredential(
        did,
        personalData || locationData,
        template.toString(),
        jwt,
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
