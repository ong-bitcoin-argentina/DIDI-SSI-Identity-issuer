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
    ADD_IMAGE: {
      code: 'ADD_IMAGE',
      message:
        'Hubo un error al adherir la imagen. Inténtelo nuevamente más tarde.',
    },
    FIND_BY_ID: {
      code: 'FIND_BY_ID',
      message:
        'No se encontró ningun usuario con el did ingresado. Inténtelo nuevamente más tarde.',
    },
    GET_DID: {
      code: 'GET_DID',
      message:
        'No se encontró ningún did con el operationId ingresado. Inténtelo nuevamente más tarde.',
    },
    CANCEL_VERIFICATION: {
      code: 'CANCEL_VERIFICATION',
      message:
        'No se pudo cancelar la operacion. Inténtelo nuevamente más tarde.',
    },
    END_OPERATION: {
      code: 'END_OPERATION',
      message:
        'No se pudo finalizar la operación. Inténtelo nuevamente más tarde.',
    },
    SIMPLE_OPERATION: {
      code: 'SIMPLE_OPERATION',
      message:
        'No se pudo cancelar/finalizar la operacion. Inténtelo nuevamente más tarde.',
    },
    OPERATION_FAIL: {
      code: 'OPERATION_FAIL',
      message:
        'No se pudo realizar la operacion. Inténtelo nuevamente mas tarde.',
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
        message: 'Error al validar información de usuario.',
      },
      NOT_FOUND: {
        code: 'NOT_FOUND',
        message: 'Usuario no encontrardo.',
      },
    },
  },
};
