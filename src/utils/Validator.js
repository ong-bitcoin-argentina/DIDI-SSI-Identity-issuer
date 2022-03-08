const { body, validationResult } = require('express-validator');

const Messages = require('../constants/Messages');
const Constants = require('../constants/Constants');
const ResponseHandler = require('./ResponseHandler');
// const TokenService = require('../services/TokenService');

/**
 *  Ejecuta validaciones generadas por "validateBody"
 */
module.exports.checkValidationResult = function checkValidationResult(
  req,
  res,
  next,
) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }
  const err = result.array();
  return ResponseHandler.sendErr(res, {
    code: err[0].msg.code,
    message: err[0].msg.message,
  });
};

/**
 *  Recibe una lista de parámetros de validación
 *  y valida que los datos recibidos en el body cumplan con esos parámetros
 */
module.exports.validateBody = function validateBody(params) {
  const validations = [];
  params.forEach((param) => {
    let validation;
    if (param.optional) {
      // Campo es opcional
      validation = body(param.name).optional();
    } else {
      // Campo no es opcional, valida que exista
      validation = body(param.name)
        .not()
        .isEmpty()
        .withMessage(Messages.VALIDATION.DOES_NOT_EXIST(param.name));
    }

    if (param.validate && param.validate.length) {
      param.validate.forEach((validationType) => {
        let regex;
        switch (validationType) {
          case Constants.VALIDATION_TYPES.IS_STRING:
            // Campo es un string, valida que lo sea
            validation
              .isString()
              .withMessage(
                Messages.VALIDATION.STRING_FORMAT_INVALID(param.name),
              );
            break;
          case Constants.VALIDATION_TYPES.IS_DATE_TIME:
            // Campo es una fecha, valida el formato sea 'aaaa-mm-ddThh:mm:ssZ'
            regex =
              /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(0[0-9]|1[0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]Z)/;
            validation
              .isLength({ min: 20, max: 20 })
              .withMessage(
                Messages.VALIDATION.LENGTH_INVALID(param.name, 20, 20),
              )
              .matches(regex)
              .withMessage(Messages.VALIDATION.DATE_FORMAT_INVALID(param.name))
              .isString()
              .withMessage(
                Messages.VALIDATION.STRING_FORMAT_INVALID(param.name),
              );
            break;
          case Constants.VALIDATION_TYPES.IS_IP:
            // Campo es una direccion ip
            regex =
              /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            validation
              .matches(regex)
              .withMessage(Messages.VALIDATION.IP_FORMAT_INVALID(param.name))
              .isString()
              .withMessage(
                Messages.VALIDATION.STRING_FORMAT_INVALID(param.name),
              );
            break;
          case Constants.VALIDATION_TYPES.IS_BOOLEAN:
            // Campo es un booleano
            validation.custom(async (value) => {
              if (
                value === 'true' ||
                value === 'false' ||
                value === true ||
                value === false
              )
                return Promise.resolve(value);
              return Promise.reject(
                Messages.VALIDATION.BOOLEAN_FORMAT_INVALID(param.name),
              );
            });
            break;
          case Constants.VALIDATION_TYPES.IS_NUMBER:
            // Campo es un numero
            validation.custom(async (value) => {
              // eslint-disable-next-line no-restricted-globals
              if (isNaN(value)) {
                return Promise.reject(
                  Messages.VALIDATION.NUMBER_FORMAT_INVALID(param.name),
                );
              }
              return Promise.resolve(value);
            });
            break;
          case Constants.VALIDATION_TYPES.IS_AUTH_TOKEN:
            // TODO: Crear blockchainService y TokenService para validacion de token
            // validation.custom(async (token, { req }) => {
            //   const data = await TokenService.getTokenData(token);
            //   req.context = req.context ? req.context : {};
            //   req.context.tokenData = data.payload;
            //   return Promise.resolve(data);
            // });
            break;
          default:
          // do nothing
        }
      });
    }

    if (param.length) {
      // Validaciones de longitud
      validation
        .isLength(param.length)
        .withMessage(
          Messages.VALIDATION.LENGTH_INVALID(
            param.name,
            param.length.min,
            param.length.max,
          ),
        );
    }

    validations.push(validation);
  });
  return validations;
};

module.exports.validateFile = function validateFile(req, res, next) {
  if (req.file) {
    const { size } = req.file;
    if (size > Constants.VALIDATION_TYPES.MAX_MB * 1000000) {
      return ResponseHandler.sendErrWithStatus(
        res,
        Messages.IMAGE.ERR.INVALID_SIZE,
      );
    }
  }
  return next();
};

module.exports.validateParams = function validateParams(req, res, next) {
  const { params } = req;
  const keys = Object.keys(params);
  const invalidKey = keys.find(
    (key) => !params[key] || params[key] === 'undefined',
  );
  if (invalidKey) {
    return ResponseHandler.sendErrWithStatus(
      res,
      Messages.VALIDATION.DOES_NOT_EXIST(invalidKey),
    );
  }
  return next();
};
