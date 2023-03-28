export const PostCall = async ({endpoint, body, token}) => {
    return await fetch(endpoint, {
        method: 'POST',
        headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};