exports.pushUser = function (user) {
    Parse.Cloud.httpRequest({        
        url: 'https://pubsub.pubnub.com/publish/pub-c-37d404ca-ce84-4be3-ba63-efdef907388f/sub-c-b4ccd410-26d3-11e4-a77a-02ee2ddab7fe/0/userschannel/0/%22%7B%27UserName%27:%27' + user.get('username') + '%27,%27FirstName%27:%27' + user.get('firstname') + '%27,%27LastName%27:%27' + user.get('lastname') + '%27,%27Email%27:%27' + user.get('email') + '%27%7D%22',
        // successful HTTP status code
        success: function (httpResponse) {
            console.log(httpResponse.text);
        },
        // unsuccessful HTTP status code
        error: function (httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
};