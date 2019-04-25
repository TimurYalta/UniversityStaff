import { API_BASE_URL, AUTHORIZATION } from '../constants/Constants';
var HttpStatus = require('http-status-codes');
const SECOND = 1000;

export const getPrograms = (token) => {
    return fetch(API_BASE_URL+'/programs',
    {
        method: 'GET',
        headers: { AUTHORIZATION: token }
    })
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status == HttpStatus.OK) {
            return response.clone().json()
                .then((data) => {
                    console.log('programs:'+data);
                    return data;
                });
        } else {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export const deleteProgram = (token, programId) => {
    return fetch(API_BASE_URL+'/programs/'+parseInt(programId),
    {
        method: 'DELETE',
        headers: { AUTHORIZATION: token }
    })
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status != HttpStatus.OK) {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export const getProgramData = (programId, token) => {
    return fetch(API_BASE_URL+'/programs/'+programId,
    {
        method: 'GET',
        headers: { AUTHORIZATION: token }
    })
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status == HttpStatus.OK) {
            return response.clone().json()
                .then((data) => {
                    console.log('programs:'+data);
                    return data;
                });
        } else {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}
