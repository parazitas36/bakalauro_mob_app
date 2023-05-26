import Resources from "../Resources";
import { ApiConstants } from "./ApiConstants";

export const PostSportsClub = async ({token, body}) => {
    const formData = new FormData();
    formData.append('Name', String(body.name));
    formData.append('Description', String(body.description));
    formData.append('PhoneNumber', String(body.phoneNumber));
    formData.append('Email', String(body.email));
    formData.append('Logo', {
        uri: String(body.image.uri),
        type: String(body.image.type),
        name: String(body.image.fileName)
    });

    return await fetch(ApiConstants().SportsClub_Endpoint, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });
};