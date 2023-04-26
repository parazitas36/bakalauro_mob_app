import Resources from "../Resources";
import { ApiConstants } from "./ApiConstants";

export const PostFormData = async ({endpoint, token, formData}) => {
    console.log(formData)

    return await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });
};