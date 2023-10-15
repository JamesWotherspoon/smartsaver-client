const Ajv = require('ajv');
const { badRequest } = require('../utils/responseHandler');

const validateBody = (schema) => {
  const ajv = new Ajv();

  return (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
    if (!valid) {
      return badRequest(req, res, validate.errors);
    }
    next();
  };
};

module.exports = { validateBody };