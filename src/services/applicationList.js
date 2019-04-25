import { API_BASE_URL, AUTHORIZATION } from '../constants/Constants';
var HttpStatus = require('http-status-codes');
const SECOND = 1000;

export const getApplications = (status, candidate) => {
    let url = API_BASE_URL+'/applications';
    url = setFilters(url, status, candidate);
    return fetch(url,
        {
            method: 'GET',
        }
    )
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status == HttpStatus.OK) {
            return response.clone().json()
                .then((data) => {
                    console.log(data);
                    return data;
                })
        } else {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export const getApplication = (id) => {
    return fetch(API_BASE_URL+'/applications/'+id,
        {
            method: 'GET',
        }
    )
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status == HttpStatus.OK) {
            return response.clone().json()
                .then((data) => {
                    console.log(data);
                    return data;
                })
        } else {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export const updateApplicationStatus = (status, id) => {
    return fetch(API_BASE_URL+'/applications/'+id,
        {
            method: 'PUT',
            body: JSON.stringify(status),
            headers: {'content-type':'application/json'}
        }
    )
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

function setFilters(url, status, candidate) {
    const params = new URLSearchParams();
    if (status) {
        params.append('status', status);
    }
    if (candidate) {
        params.append('candidate', candidate);
    }
    if (status || candidate) {
        url += '?' + params.toString();
    }
    return url;
}
