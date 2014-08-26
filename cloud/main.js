
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

Parse.Cloud.define("hello", function (request, response) {
    var message = { Name: 'ayman' };
    Parse.Cloud.httpRequest({
        url: 'https://pubsub.pubnub.com/publish/pub-c-37d404ca-ce84-4be3-ba63-efdef907388f/sub-c-b4ccd410-26d3-11e4-a77a-02ee2ddab7fe/0/userschannel/0/%22%7B%27UserName%27:%27ayman%27,%27FirstName%27:%27first%27,%27LastName%27:%27last%27%7D%22',
        // successful HTTP status code
        success: function (httpResponse) {
            console.log(httpResponse.text);
        },
        // unsuccessful HTTP status code
        error: function (httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
    response.success("Hello ayman!");
});

Parse.Cloud.define("createuser", function (request, response) {
    var newUser = new Parse.User();
    newUser.set("username", request.params.username);
    newUser.set("password", request.params.password);
    newUser.set("firstname", request.params.firstname);
    newUser.set("lastname", request.params.lastname);
    newUser.set("email", request.params.email);
    
    newUser.save(null, {
        success: function (usr) {
            // make push notification by pubnub service
            var pusher = require('cloud/pusher.js');            
            pusher.pushUser(usr);
            response.success("user created");
            
        },
        error: function (usr, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.message);
            response.error(error.message);
        }
    });
});