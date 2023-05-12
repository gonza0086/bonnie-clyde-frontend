export function createAdaptedUser(user) {
    return {
        firstName: user['first-name'],
        lastName: user['last-name'],
        email: user.email,
        password: user.password,
    };
}
