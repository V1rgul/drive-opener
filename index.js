#!/usr/bin/env node


var browserLocation = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';


var Promise       = require('bluebird');
var dialog        = Promise.promisifyAll(require('dialog'));
var readFileAsync = Promise.promisify(require('fs').readFile);
var execFileAsync = Promise.promisify(require('child_process').execFile);


promise = Promise.resolve();

promise = promise.then(function(resolve, reject){
	var args = process.argv.slice(2);
	//console.log("argv: ", args);
	var file = args[0];
	return readFileAsync(file);
});
promise = promise.then(function (contents){
	var json = JSON.parse(contents);
	//console.log("url:"+json.url);
	return json.url;
});
promise = promise.then(function (url){
	return execFileAsync(browserLocation, [url]);
});


//catch errors
promise.catch(function die(err){
	var errString = "ERROR "+err;
	console.error(errString);
	errString = errString.replace(/"/g, "''"); //dialog does not handle double quotes
	return dialog.errAsync(errString).return();
});
