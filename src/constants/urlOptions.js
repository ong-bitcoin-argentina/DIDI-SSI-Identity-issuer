const Constants = require('./Constants');

const options = new Map();

// URL DE CADA ENDPOINT
options.set('front', Constants.VUS_URLS.ADD_FRONT);
options.set('back', Constants.VUS_URLS.ADD_BACK);
options.set('selfie', Constants.VUS_URLS.ADD_SELFIE);
options.set('cancel', Constants.VUS_URLS.CANCEL_OPERATION);
options.set('create', Constants.VUS_URLS.NEW_OPERATION);
options.set('finish', Constants.VUS_URLS.END_OPERATION);
options.set('getInformation', Constants.VUS_URLS.GET_DOCUMENT_INFORMATION);

module.exports = options;
