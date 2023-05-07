export const PatchCall = async ({endpoint, token}) => {
    return await fetch(endpoint, {
        method: 'PATCH',
        headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
};