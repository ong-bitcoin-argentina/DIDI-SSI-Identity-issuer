const COMMUNICATION_ERROR = {
  code: 'COMMUNICATION_ERROR',
  message:
    'No es posible conetarse con el servidor, por favor inténtelo de nuevo más tarde.',
};

module.exports = {
  COMMUNICATION_ERROR,

  INDEX: {
    ERR: {
      CONNECTION: 'Error de conexion en la base de datos: ',
    },
    MSG: {
      CONNECTING: 'conectandose a: ',
      CONNECTED: 'Base de datos conectada.',
      HELLO_WORLD: 'Hola DIDI!',
      RUNNING_ON: 'Ejecutandose en puerto ',
    },
  },

  VUS: {
    CREATE: {
      code: 'REQ_CREATE',
      message:
        'No pudo registrarse el pedido de validacion de identidad, por favor inténtelo de nuevo más tarde.',
    },
    NEW_OPERATION: {
      code: 'NEW_OPERATION',
      message:
        'Hubo un error al iniciar el tramite de validacion, por favor inténtelo de nuevo más tarde.',
    },
    CANCEL_OPERATION: {
      code: 'CANCEL_OPERATION',
      message:
        'Hubo un error al cancelar el tramite de validacion, por favor inténtelo de nuevo más tarde.',
    },
    GET: {
      code: 'REQ_GET',
      message:
        'No pudo obtenerse el pedido de validacion de identidad, por favor inténtelo de nuevo más tarde.',
    },
    UPDATE: {
      code: 'REQ_UPDATE',
      message:
        'No pudo actualizarse el pedido de validacion de identidad, por favor inténtelo de nuevo más tarde.',
    },
  },

  VALIDATION: {
    DOES_NOT_EXIST(type) {
      return { code: 'PARAMETER_MISSING', message: `falta el campo: ${type}` };
    },
    IP_FORMAT_INVALID(field) {
      return {
        code: 'PARAMETER_TYPE_ERROR',
        message: `El campo ${field} es incorrecto, se esperaba una direccion ip`,
      };
    },
    STRING_FORMAT_INVALID(field) {
      return {
        code: 'PARAMETER_TYPE_ERROR',
        message: `El campo ${field} es incorrecto, se esperaba un texto`,
      };
    },
    NUMBER_FORMAT_INVALID(field) {
      return {
        code: 'PARAMETER_TYPE_ERROR',
        message: `El campo ${field} es incorrecto, se esperaba un número`,
      };
    },
    BOOLEAN_FORMAT_INVALID(field) {
      return {
        code: 'PARAMETER_TYPE_ERROR',
        message: `El campo ${field} es incorrecto, se esperaba un booleano ('true' o 'false')`,
      };
    },
    DNI_FORMAT_INVALID(field) {
      return {
        code: 'PARAMETER_TYPE_ERROR',
        message: `El campo ${field} es incorrecto, se esperaba una dni`,
      };
    },
    LENGTH_INVALID(field, min, max) {
      const code = 'PARAMETER_LENGTH_ERROR';
      const msgStart = `El campo ${field} tendría que tener`;

      if (min && !max) {
        return {
          code,
          message: `${msgStart} mas que ${min} caracteres`,
        };
      }

      if (!min && max) {
        return {
          code,
          message: `${msgStart} menos que ${max} caracteres`,
        };
      }

      if (min === max) {
        return {
          code,
          message: `${msgStart} exactamete ${max} caracteres`,
        };
      }
      return {
        code,
        message: `${msgStart} entre ${min} y ${max} caracteres`,
      };
    },
    APP_DID_NOT_FOUND: (did) => ({
      code: 'APP_DID_NOT_FOUND',
      message: `La Aplicación con el DID ${did} no esta autorizada.`,
    }),
    ADMIN_DID_NOT_MATCH: (did) => ({
      code: 'ADMIN_DID_NOT_MATCH',
      message: `El DID ${did} provisto no coincide con ningún admin.`,
    }),
    DID_NOT_FOUND: (did) => ({
      code: 'DID_NOT_FOUND',
      message: `El usuario con el DID ${did} no existe.`,
    }),
  },

  USER: {
    SUCCESS: {
      LOGGED_IN: {},
      REGISTERED: {},
      CHANGED_PASS: {},
      CHANGED_PHONE(cert) {
        return { certificate: cert };
      },
      CHANGED_EMAIL(cert) {
        return { certificate: cert };
      },
    },
    ERR: {
      INVALID_LOGIN: {
        code: 'INVALID_LOGIN',
        message:
          'No se encontró ese usuario: email o contraseña incorrecta. (si no recuerda su contraseña, vaya atrás y haga click en recuperar cuenta > No recuerdo la contraseña)',
      },
      VALIDATE_DID_ERROR: {
        code: 'VALIDATE_DID_ERROR',
        message: 'Ese did no se encuentra autorizado a realizar esa operacion.',
      },
      USER_ALREADY_EXIST: {
        code: 'USER_ALREADY_EXIST',
        message:
          "Ese did ya se encuentra asociado a un usuario, si desea utilizar una cuenta ya existente, por favor dirigirse a 'Recuperar Cuenta'.",
      },
      INVALID_USER: {
        code: 'INVALID_USER',
        message:
          'El usuario y contraseña no coinciden, por favor, verifique los valores antes de intentarlo nuevamente.',
      },
      INVALID_USER_DID: {
        code: 'INVALID_USER_DID',
        message:
          'El usuario fue generado desde otro teléfono, es necesario recuperar la cuenta para loguearse.',
      },
      INVALID_USER_EMAIL: {
        code: 'INVALID_USER_EMAIL',
        message:
          'El mail ingresado no corresponde a ese usuario, por favor verifique que sea correcto antes de volver a intentarlo.',
      },
      NOMATCH_USER_DID: {
        code: 'NOMATCH_USER_DID',
        message:
          'No se encontró ningún usuario con ese did, por favor verifique que sea correcto antes de volver a intentarlo.',
      },
      NOMATCH_USER_EMAIL: {
        code: 'NOMATCH_USER_EMAIL',
        message:
          'No se encontró ningún usuario con ese mail y contraseña, por favor, verifique los valores antes de intentarlo nuevamente.',
      },
      MAIL_NOT_VALIDATED: {
        code: 'MAIL_NOT_VALIDATED',
        message:
          'Ese mail no fue validado, en caso de no haber terminado el proceso, por favor verifique su direccion de correo, un mail con el codigo de validacion deberia encontrarse alli.',
      },
      PHONE_NOT_VALIDATED: {
        code: 'PHONE_NOT_VALIDATED',
        message:
          'Ese teléfono no fue validado, en caso de no haber terminado el proceso, por favor verifique sus mensajes, un sms con el codigo de validacion deberia encontrarse alli.',
      },
      VALIDATE: {
        code: 'VALIDATE',
        message:
          'Error al validar informacion de usuario, por favor inténtelo de nuevo más tarde.',
      },
      EMAIL_TAKEN: {
        code: 'EMAIL_TAKEN',
        message: 'Ese mail ya se encuentra en uso, por favor elija otro.',
      },
      TEL_TAKEN: {
        code: 'TEL_TAKEN',
        message: 'Ese teléfono ya se encuentra en uso, por favor elija otro.',
      },
      CREATE: {
        code: 'USER_CREATE',
        message:
          'Hubo un error al durante la creación  del usuario, por favor inténtelo de nuevo más tarde.',
      },
      GET: {
        code: 'USER_GET',
        message:
          'No se pudo obtener el usuario, por favor inténtelo de nuevo más tarde.',
      },
      UPDATE: {
        code: 'USER_UPDATE',
        message:
          'No se pudo actualizar el usuario, por favor inténtelo de nuevo más tarde.',
      },
    },
  },
};
