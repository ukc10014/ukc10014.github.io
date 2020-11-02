/*
Hue control in plain JavaScript
created 11 June 2020
by Tom Igoe
*/

let address = '192.168.86.87';       // IP address of the Hue hub
let username = 'Ju5E9TaHtBCrBOkGfcNiRERiFrB6zeTeCX2D7-bE';      // username on the hub
let lightNumber = 2;   // number of the light to control
let lightState = {      // JSON with the state of the light
    on: true,
    bri: 0
};

// when the page loads, do this (like setup() in p5.js):
document.addEventListener('DOMContentLoaded', (event) => {
    // Add event listeners
    const credButton = document.getElementById("creds");
    credButton.addEventListener("click", setCreds, false);

    const slider = document.getElementById("bri");
    slider.addEventListener("change", changeLight, false);

    const button = document.getElementById("on");
    button.addEventListener("click", changeLight, false);



    // make the HTTP GET call to get the light data:
    // HTTP GET http://your.hue.hub.address/api/username/lights/
    /*fetch('http://' + address +
        '/api/' + username
        + '/lights/')
        .then(response => response.json())
        .then(data => console.log(data));*/
})

// set the credentials for the Hue hub
// (event listener for the Enter button):
function setCreds(evt) {
    const addressField = document.getElementById("address");
    address = addressField.value;

    const userField = document.getElementById("username");
    username = userField.value;

    console.log(username + "  " + address);

}

/*
this function makes an HTTP PUT call to change the properties of the lights:
HTTP PUT http://your.hue.hub.address/api/username/lights/lightNumber/state/
and the body has the light state:
{
  on: true/false,
  bri: brightness
}
*/
function changeLight(evt) {
    // get the ID of the DOM element that generated this event:
    console.log(evt.target.id);
    // if it was the on button:
    if (evt.target.id === 'on') {
        // if the button reads "On", turn the light on:
        if (evt.target.value == 'On') {
            lightState.on = true;
            // change the button label to off:
            evt.target.value = 'Off';
        } else {
            // if the button reads "Off", turn the light off:
            lightState.on = false;
            // change the button label to on
            evt.target.value = 'On';
        };
    }
    if (evt.target.id === 'bri') {
        // if the event was generated by the slider,
        // get the slider's value and set the brightness:
        lightState.bri = parseInt(evt.target.value);
    }

    // print out the light state JSON:
    console.log(lightState);
    // send the PUT request:
    putData('http://' + address +
        '/api/' + username
        + '/lights/' + lightNumber + '/state/', lightState)
        .then(data => {
            console.log(data); // JSON data parsed by `response.json()` call
        });

       /* putDataXML2('https://' + address +
        '/api/' + username
        + '/lights/' + lightNumber + '/state/',lightState); */
}

// this function makes the actual PUT request using fetch():
async function putData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        //   mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

