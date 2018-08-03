import Ajv from 'ajv';
import schemas from './schemas';
import log from '../../util/log';

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const isValid = (state) => {
  if (!state.version) return false;

  const schema = schemas[state.version];
  const validate = ajv.compile(schema);
  const valid = validate(state.data);

  if (!valid) log(validate.errors);

  return valid;
};

export default isValid;
