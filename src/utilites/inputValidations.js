const VALIDATOR = {
    text: validateText,
    email: validateEmail,
    password: validatePassword,
};

export function validateInput(value, type, required) {
    const validator = VALIDATOR[type];
    let validation = { isValid: true, message: '' };

    if (value !== '') {
        validation = validator(value);
    } else if (required) {
        validation = { isValid: false, message: 'required input is empty!' };
    }

    return validation;
}

function validateText() {
    let isValid = true;
    let message = '';

    return { isValid, message };
}

function validateEmail(value) {
    let isValid = true;
    let message = '';

    if (value.match(/.+@\w+(\.com)$/g) === null) {
        isValid = false;
        message = 'that is not a valid email!';
    }

    return { isValid, message };
}

function validatePassword(value) {
    let isValid = true;
    let message = '';

    if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
        isValid = false;
        message = 'password is not valid!';
    }

    return { isValid, message };
}

export function revalidateValue(value, id, revalidate, revalidateId) {
    let isValid = true;
    let message = '';

    if (value !== revalidate) {
        isValid = false;
        message = `${id} does not match ${revalidateId}!`;
    }

    return { isValid, message };
}
