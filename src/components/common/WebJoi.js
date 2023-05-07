import Joi from 'joi-browser';

const schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(8).alphanum().label('Password'),
    confirmPassword: Joi.ref('password'),
};

/**
 * Validate the input property
 * @param {*} param0 The input property
 * @param {*} password The password property (optional - used for confirm password validation)
 * @returns 
 */
const validateProperty = ({ name, value }, password = "") => {
    const obj = { [name]: value };
    const currentSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, currentSchema);

    if (name === 'confirmPassword') {
        if (password === value) return null;
        else {
            return 'Both passwords must match!';
        }
    }
    return error ? error.details[0].message : null;
}

/**
 * Validate input change event
 * @param {*} Input The input property
 * @param {*} setErrors The setErrors state property
 * @param {*} isLogin Is the current page a login page (optional - used for confirm password validation)
 * @param {*} password The password property (optional - used for confirm password validation)
 * @param {*} confirmPassword The confirmPassword property (optional - used for confirm password validation)
 * @returns 
 */
const validateChange = (Input, setErrors, isLogin = false, password = "", confirmPassword = "") => {
    if (isLogin) {
        setErrors(prevState => ({ ...prevState, [Input.name]: validateProperty(Input, password) }));
        return;
    }

    if (Input.name === 'confirmPassword') {
        if (password === Input.value)
            setErrors(prevState => ({ ...prevState, confirmPassword: "" }));
        else
            setErrors(prevState => ({ ...prevState, confirmPassword: "Both passwords must match!" }));
    }
    else if ((Input.name === 'password')) {
        if (Input.value === confirmPassword)
            setErrors(prevState => ({ ...prevState, confirmPassword: "" }));
        else
            setErrors(prevState => ({ ...prevState, confirmPassword: "Both passwords must match!" }));
    }

    setErrors(prevState => ({ ...prevState, [Input.name]: validateProperty(Input, password) }));
}

export { validateChange, validateProperty };
