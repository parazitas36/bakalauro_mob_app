import React from 'react';
import {ApiConstants} from './ApiConstants';

export const LoginCall = async (body) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 5000)
    try {
        const response = await fetch(ApiConstants().LOGIN, {
            method: 'POST',
            headers: {
                "Accept" : "*/*",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body),
            signal: controller.signal
        });
        clearTimeout(id);
    
        return response;
    }
    catch {
        controller.abort();
        return {status: 500}
    }
};

