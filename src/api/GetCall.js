export const GetCall = async ({endpoint, token}) => {
    return await fetch(endpoint, {
        method: 'GET',
        headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        }
    });
};
