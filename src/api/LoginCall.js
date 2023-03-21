import React from 'react';
import {ApiConstants} from './ApiConstants';

export const LoginCall = async (body) => {
    return await fetch(ApiConstants().LOGIN, {
        method: 'POST',
        headers: {
            "Accept" : "*/*",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
    });
};

