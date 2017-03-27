//dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const expssn = require("express-session");
const methodOverride = require("method-override");
const querystring = require("querystring");
const request = require("request");
const bodyParser = require("body-parser");
const SpotifWebApi = require("spotify-web-api-js");
const session = require("express-session");

//create instance of express app
var app = express();

//specify port
var port = process.env.PORT || 8888;

// sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(methodOverride("_method"));

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//sets up handlebar views
var hbs = exphbs.create({
    defaultLayout: 'main',

    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});

//need sessions to persist state of user
app.use(session({
  secret: '3or8h1o2h1o28u12o38j12',
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//required routes
const routes = require("./routes/mainroutes.js")(app);
const spotifyRoutes = require("./routes/spotifyRoutes.js")(app);



app.use(cookieParser())

app.set('port', port);
app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });