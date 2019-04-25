import {API_BASE_URL} from '../constants/Constants';
var HttpStatus = require('http-status-codes');

export const createTest = (name) => {
    return fetch(API_BASE_URL+'/tests',
        {
            method: 'POST',
            body: JSON.stringify(
                {
                    title:name
                }
            ),
            headers: {'content-type': 'application/json'}
        }
    )
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status == HttpStatus.OK) {
            return response.clone().json()
                .then((data) => {
                    console.log('test_id:'+data.test_id);
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

export const modifyTest = (testId, title) => {
    return fetch(API_BASE_URL+'tests/'+testId,
        {
            method: 'PUT',
            body: JSON.stringify({
                title: title
            }),
            headers: {'content-type': 'application/json'}
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

export const createQuestion = (testId, question) => {

    return fetch(API_BASE_URL+'/tests/'+testId+'/questions',
        {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {'content-type': 'application/json'}
        }
    )
    .then((response) => {
        console.log(response.status + " " + response.statusText);
        if (response.status != HttpStatus.CREATED) {
            throw response;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export const modifyQuestion = (testId, questionNumber, question) => {
    return fetch(API_BASE_URL+'/tests/'+testId+'/questions/'+questionNumber,
        {
            method: 'PUT',
            body: JSON.stringify(question),
            headers: {'content-type': 'application/json'}
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

export const deleteQuestion = (testId, questionNumber) => {
    return fetch(API_BASE_URL+'/tests/'+testId+'/questions/'+questionNumber,
        {
            method: 'DELETE'
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
