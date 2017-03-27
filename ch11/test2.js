function validateEmail(email) {
    return email.match(/@/) ?
        email :
        new Error(`Invalid email: ${email}`);
}


const email = null;

try {
    const validatedEmail = validateEmail(email);
    if (validatedEmail instanceof Error) {
        console.error(`Error: ${validatedEmail.message}`);
    } else {
        console.log(`Valid email: ${validatedEmail}`);
    }
} catch (err) {
    console.error(`Error: ${err.message}`);
}
