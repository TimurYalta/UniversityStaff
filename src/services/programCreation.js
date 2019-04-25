import { API_BASE_URL, AUTHORIZATION} from '../constants/Constants';
var HttpStatus = require('http-status-codes');

export const createProgram = (token, title) => {
    return fetch(API_BASE_URL+'/programs',
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    title: title
                }
            ),
            headers: {
                'content-type': 'application/json',
                AUTHORIZATION: token
            }
        }
    )
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status == HttpStatus.OK) {
            return response.clone().json()
                .then((data) => {
                    console.log('program_id:'+data.id);
                    return data.id;
                });
        } else {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export const modifyProgram = (token, programId, title, tests) => {
    return fetch(API_BASE_URL+'/programs/'+programId,
        {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                tests: tests
            }),
            headers: {
                'content-type': 'application/json',
                AUTHORIZATION: token
            }
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
    })
}
