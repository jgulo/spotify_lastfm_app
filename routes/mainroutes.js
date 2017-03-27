var express = require("express");
var methodOverride = require("method-override");

module.exports = function(app){
	const router = express.Router();

	router.use(methodOverride("_method"));
	
	router.get("/", function(req,res){
		console.log("rendering")
		res.render("index");
	})

	app.use("/", router);
};


