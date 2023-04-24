export function validateRequired(value, id) {
    let isValid = true;
    let message = '';

    if (value.length === 0) {
        isValid = false;
        message = `${id} is empty!`;
    }

    return { isValid, message };
}

export function validateText(value) {
    let isValid = true;
    let message = '';

    return { isValid, message };
}

export function validateEmail(value) {
    let isValid = true;
    let message = '';

    if (value.match(/.+@\w+(\.com)$/g) === null) {
        isValid = false;
        message = 'that is not a valid email!';
    }

    return { isValid, message };
}

export function validatePassword(value) {
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
