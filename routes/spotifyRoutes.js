//dependencies
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');

module.exports = function(app){

	var spotifyApi = new SpotifyWebApi({
	  clientId : '1614dad5367c4ca8b6b16ccbd4797029',
	  clientSecret : '427238afcead4aaba868a68aae13d9d2',
	  redirectUri : 'http://localhost:8888/callback'
	});

	var client_id = '1614dad5367c4ca8b6b16ccbd4797029'; // Your client id
	var client_secret = '427238afcead4aaba868a68aae13d9d2'; // Your secret
	var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

	/**
	 * Generates a random string containing numbers and letters
	 * @param  {number} length The length of the string
	 * @return {string} The generated string
	 */
	var generateRandomString = function(length) {
	  var text = '';
	  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	  for (var i = 0; i < length; i++) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  }
	  return text;
	};

	var stateKey = 'spotify_auth_state';

	app.get('/login', function(req, res) {
		console.log("login redirect")
	  var state = generateRandomString(16);
	  res.cookie(stateKey, state);

	  // your application requests authorization
	  var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
	  res.redirect('https://accounts.spotify.com/authorize?' +
	    querystring.stringify({
	      response_type: 'code',
	      client_id: client_id,
	      scope: scope,
	      redirect_uri: redirect_uri,
	      state: state
	    }));
	});

	app.get('/callback', function(req, res) {
		console.log("callback")
		res.render("home");

	});

};