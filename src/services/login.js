export const authenticate = (username, password) => {
    var authenticationData = {
        Username : 'username',
        Password : 'password',
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = { UserPoolId : 'us-east-1_TcoKGbf7n',
        ClientId : '4pe2usejqcdmhi0a25jp4b5sh3'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : 'username',
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            return result.getAccessToken().getJwtToken();
        },

        onFailure: function(err) {
            alert(err);
        },

    });
}