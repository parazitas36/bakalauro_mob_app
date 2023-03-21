import React from 'react';
import {ApiConstants} from './ApiConstants';

export const RegisterCall = async (body) => {
    return await fetch(ApiConstants().REGISTER, {
        method: 'POST',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    });
};

