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
    ADD_FRONT: {
      code: 'ADD_FRONT',
      message: 'Hubo un error al adherir el frente del documento.',
    },
    WEAK_MATCH_FRONT: {
      code: 'WEAK_MATCH',
      message:
        'El resultado arrojado por VU Security tiene un grado bajo de precision. Por favor, intente sacar nuevamente la foto al frente del DNI',
    },
    ADD_DOCUMENT_IMAGE: {
      code: 'ADD_DOCUMENT_IMAGE',
      message: 'Hubo un error al adherir la imgen del frente del documento',
    },
    ADD_BACK: {
      code: 'ADD_BACK',
      message: 'Hubo un error al adherir el dorso del documento',
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
    ERR: {
      VALIDATE: {
        code: 'VALIDATE',
        message: 'Error al validar informacion de usuario.',
      },
    },
  },
};
