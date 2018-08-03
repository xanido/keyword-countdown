import Ajv from "ajv"
import schemas from "./schemas"

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const isValid = (state) => {
    if(!state.version) return false;

    const schema = schemas[state.version]
    const validate = ajv.compile(schema);
    const valid = validate(state.data);

    if (!valid) console.log(validate.errors);

    return valid
}

export { isValid }