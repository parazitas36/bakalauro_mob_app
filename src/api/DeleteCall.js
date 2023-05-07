export const DeleteCall = async ({endpoint, token}) => {
    return await fetch(endpoint, {
        method: 'DELETE',
        headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
    });
};