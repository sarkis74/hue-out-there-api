'use strict';

let hue = require('node-hue-api');
let HueApi = hue.HueApi;
let hueScene = hue.scene;

let host = "172.16.8.233";
let username = "3RcWD2DoxBwDfmLquhTi8bVpXh7IzhLOw8GpfCe4";


let lightState = require('node-hue-api').lightState;

let displayResults = function(result) {
    console.log(JSON.stringify(result, null, 2))
};

let displayError = function(err) {
    console.error(err);
};

// command line execution
const myArgs = process.argv.slice(2);

let sceneId =  "60VeO3KNkG1aec9";
let state = lightState.create();

// new instance of api
let api = new HueApi(host, username);

// command line execution
const bulb = process.argv[2]; // which bulb to change: 1, 2, 6, or 7
const onOrOff = process.argv[3]; // on or off
const possibleArgs = [1, 2, 6, 7];

// error handling
// if(!possibleArgs.includes(parseInt(bulb))) {
//   throw new Error('Must be 1, 2, 6, or 7');
// }

// // you can run: 'node bridge.js <light id>  <'on/off'>'
// switch(onOrOff) {
//     case 'on':
//         api.setLightState(bulb, state.on())
//             .then(displayResults)
//             .fail(displayError)
//             .done();
//         break;
//     case 'off':
//         api.setLightState(bulb, state.off())
//             .then(displayResults)
//             .fail(displayError)
//             .done();
//         break;
//     // you can run: 'node bridge.js <light id> groupon'
//     case 'groupon':
//         api.setGroupLightState(4, state.on())
//             .then(displayResults)
//             .fail(displayError)
//             .done();
//         break;
//     case 'groupoff':
//         api.setGroupLightState(4, state.off())
//             .then(displayResults)
//             .fail(displayError)
//             .done();
//         break;
//     default:
//         console.log('Sorry, invalid method');
// }
