export const ApiConstants = () =>  {
    const SSL_URL = 'https://10.0.2.2:5021:7013/api/'
    const URL = 'http://localhost:5021/api/'
    const USERS_ENDPOINT = 'Users/'
    const SPORTSCLUB_ENDPOINT = 'SportsClub/'

    return ({
        USERS_ENDPOINT,
        SPORTSCLUB_ENDPOINT,
        REGISTER: `${URL}${USERS_ENDPOINT}register`,
        LOGIN: `${URL}${USERS_ENDPOINT}login`,
        AdminClub: `${URL}${SPORTSCLUB_ENDPOINT}usersportsclub`,
    });
}
