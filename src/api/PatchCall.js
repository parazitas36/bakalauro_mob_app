export const PatchCall = async ({endpoint, token, body=null}) => {
    return await fetch(endpoint, {
        method: 'PATCH',
        headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: body !== null ? JSON.stringify(body) : null
    });
};