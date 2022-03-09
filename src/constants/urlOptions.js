const Constants = require('./Constants');

const options = new Map();

options.set('front', Constants.VUS_URLS.ADD_FRONT);
options.set('back', Constants.VUS_URLS.ADD_BACK);
options.set('selfie', Constants.VUS_URLS.ADD_SELFIE);
options.set('cancel', Constants.VUS_URLS.CANCEL_OPERATION);
options.set('create', Constants.VUS_URLS.NEW_OPERATION);
options.set('finish', Constants.VUS_URLS.END_OPERATION);

module.exports = options;
