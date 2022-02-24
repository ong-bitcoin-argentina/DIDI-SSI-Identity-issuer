const swaggerJsdoc = require('swagger-jsdoc');

const { NAME, VERSION, ENVIRONMENT } = require('../../constants/Constants');

/**
 * Config de Swagger
 */
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: NAME,
      description: `Corriendo en el ambiente: ${ENVIRONMENT}. Para más información, visite la [documentación](https://docs.didi.org.ar/).`,
      version: VERSION,
    },
    servers: [
      {
        url: '/',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
const apiSpecification = swaggerJsdoc(options);

module.exports = apiSpecification;
