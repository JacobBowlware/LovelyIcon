import Joi from 'joi-browser';

const schema = {
    email: Joi.string().required().email().label('Email'),
    password: Joi.string().required().min(8).alphanum().label('Password'),
    confirmPassword: Joi.ref('password'),
};


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
