// Load required packages
var express 			= require('express');
var mysql               = require('mysql');
var bodyParser 			= require('body-parser');
var url                 = require('url');

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

var database = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    //password : '41842930',
    password : '',
    database : 'plazaDeportes'
});

database.connect();

var usuario = 'admin';
var password = '123';
var token;

// Create our Express router
var router = express.Router();

router.route('/validate')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (query.token == token) { res.send(true) } else { res.send(false) };
    });

router.route('/login')
    .post(function(req, res) {
        if (req.body.usuario == usuario && req.body.password == password) {
            let t = 'token';
            token = t;
            return res.json({token: t});
        }
        res.status(401).send()
    });

router.route('/logout')
    .post(function(req, res) {
        if (req.body.token != token) { return res.status(401).send() };
        token = null;
        res.json();
    });

router.route('/group')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (query.token != token) { return res.status(401).send() };
        database.query('SELECT * FROM `group` WHERE id = ?', [query.id], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/group')
    .delete(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (query.token != token) { return res.status(401).send() };
        database.query('DELETE FROM `group` WHERE id = ?', [query.id], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/groups')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        database.query('SELECT * FROM `group`', [], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/group')
    .post(function(req, res) {
        if (req.body.token != token) { return res.status(401).send() };
        database.query('INSERT INTO `group` () VALUES ()', [], function (err, results, fields) {
            if (err){ console.log(err); res.status(500).send('Ha habido un error, intenta nuevamente o vuelve a iniciar sesión.') };
            res.json(results);
        });
    });

router.route('/inscription')
    .delete(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        database.query('DELETE FROM inscription WHERE id = ?', [query.id], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/inscription')
    .post(function(req, res) {
        database.query('INSERT INTO inscription () VALUES ()', [], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

//register router
app.use(router);

var server = app.listen(8080, function(){
    console.log('Server is listening on port '+server.address().port);
});

