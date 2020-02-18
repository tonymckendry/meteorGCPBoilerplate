export const required = value => (!value ? 'Required' : false)

export const email = value =>
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : false

export const passwordStrength = (value) =>
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value) ? 'Password doesnt match requirements ' : false

export const passwordsMatch = (value, formValues) => {
    return (formValues.password && formValues.password !== value) ||
        (formValues.passwordConfirm && formValues.passwordConfirm !== value)
        ? "Passwords don't match"
        : false
}
