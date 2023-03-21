export const ApiConstants = () =>  {
    const SSL_URL = 'https://10.0.2.2:5021:7013/api/'
    const URL = 'http://10.0.2.2:5021/api/'
    const USERS_ENDPOINT = 'Users/'
    return ({
        REGISTER: `${URL}${USERS_ENDPOINT}register`,
        LOGIN: `${URL}${USERS_ENDPOINT}login`
    });
}
