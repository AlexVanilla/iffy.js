// TODO:
// Test the get and set active object functions
// Test build ajax requests


// NOTE:  This relies on JQuery to make the ajax functions

// NOTE:  This is an IIFE that returns an object called 'iffy'
(function () {
    console.log("iffy.js fired!");

    // NOTE:  This is hard coded in the framework (could find a way to make this dynamic but this saves typing)
    var url = "url.endpoint.com";
    var activeObject = null;

    return iffy = {

        // NOTE:  Testing if I can reference properties in here.  
        // We would need activeObject later for editing elements in the DOM

        // NOTE: setActiveObject and getActiveObject are like getters and setters in C# 
        // Function that takes a reference of a DOM object and sets it to the activeObject that's in iffy's outer reference scope
        setActiveObject: function (reference) {
            activeObject = reference;
        },
        // Function that get's activeObject from iffy's outer reference scope
        getActiveObject: function () {
            return activeObject;
        },

        // Function factory to make functions that do ajax requests
        // buildAjaxRequest returns a function that makes the ajax call with appropriate settings
        // iffy.buildAjaxRequest requires:
        // type: the type of ajax request
        // url: The domain url for the request (NOTE: this is declared in the beginning)
        // endpoint:  The api endpoint to append to the url
        buildAjaxRequest: function (requestType, endpoint) {

            //Making the settings object
            var settings = {
                cache: false,
                contentType: "application/json",
                dataType: "JSON",
                type: requestType,
                xhrFields: {
                    withCredentials: true
                }
            };

            // depending on what requestType is, build appropriate ajax settings object
            // NOTE:  Only POST & PUT will have inputData

            // Function that requires:
            // inputData: input data that will be for the ajax request
            // endPoint:  api endPoint where the ajax request will go
            // onSuccessAjax:  callback function if the request succeeds
            // onErrorAjax:  callback function if the request fails

            // if statements to see if type is "GET", "POST", "PUT", "DELETE"
            if (requestType === "GET") {
                return function (onSuccessAjax, onErrorAjax) {
                    settings.success = onSuccessAjax;
                    settings.error = onErrorAjax;
                    $.ajax(url + endpoint, settings);
                }
            }
            if (requestType === "POST") {
                return function (inputData, onSuccessAjax, onErrorAjax) {
                    settings.data = JSON.stringify(inputData);
                    settings.success = onSuccessAjax;
                    settings.error = onErrorAjax;
                    $.ajax(url + endPoint, settings);
                }
            }
            if (requestType === "PUT") {
                return function (inputData, onSuccessAjax, onErrorAjax) {
                    settings.data = JSON.stringify(inputData);
                    settings.success = onSuccessAjax;
                    settings.error = onErrorAjax;
                    $.ajax(url + endPoint, settings);
                }
            }
            if (requestType === "DELETE") {
                return function (onSuccessAjax, onErrorAjax) {
                    settings.success = onSuccessAjax;
                    settings.error = onErrorAjax;
                    $.ajax(url + endPoint, settings);
                }
            }
        }
    }
})();
