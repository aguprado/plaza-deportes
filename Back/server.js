// Load required packages
var express 			= require('express');
var mongoose 			= require('mongoose');
var bodyParser 			= require('body-parser');
var url                 = require('url');

//connect to db
mongoose.connect('mongodb://localhost/Mineswepper');
var app = express();
app.use(bodyParser.json({}));

//set cors permissions
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'accept, authorization, dataType, content-type');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

var Game = require('./game');

// Create our Express router
var router = express.Router();

//endpoint to get a game by id from db
router.route('/game')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        Game.findOne({_id: query.id}).exec(function(err, game){
            if (err){
                //logs the error and sends it with status 500
                console.log(err);
                res.status(500).send(err);
            } else{ res.json(game) };
        });
    });

//endpoint to delete a game by id from db
router.route('/game')
    .delete(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        Game.remove({_id: query.id}).exec(function(err, result){
            if (err){
                //logs the error and sends it with status 500
                console.log(err);
                res.status(500).send(err);
            } else{ res.json(result) };
        });
    });

//endpoint to get all games in db
router.route('/games')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        Game.find({}).exec(function(err, games){
            if (err){
                //logs the error and sends it with status 500
                console.log(err);
                res.status(500).send(err);
            } else{ res.json(games) }
        });
    });

//endpoint to post a game to save in db
router.route('/game')
    .post(function(req, res) {
        var game = new Game(req.body)
        game.save(function(err, result){
            if (err){
                //logs the error and sends it with status 500
                console.log(err);
                res.status(500).send(err);
            } else{ res.json(result) }
        });
    });

//register router
app.use(router);

var server = app.listen(8080, function(){
    console.log('Server is listening on port '+server.address().port);
});

