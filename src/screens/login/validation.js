export const Validation = (username, password) => {
    return {
        usernameMessage: username === null || username === '' ? 'Please enter your username' : null,
        passwordMessage: password === null || password === '' ? 'Please enter your password' : null,
    }
  };