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
    database : 'plazadeportes'
});

database.connect();

function randomToken() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function validateToken(token, callback) {
    database.query('SELECT * FROM usuario WHERE token = ?', [token], function (err, results, fields) {
        if (!results || !results.length){ return callback(false) };
        if (err){ console.log(err); return callback(false) };
        return callback(true);
    })
}

// Create our Express router
var router = express.Router();

router.route('/validate')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            res.send(result);
        });
    });

router.route('/login')
    .post(function(req, res) {
        var token = randomToken();
        if (!req.body.usuario || !req.body.password) { return res.status(400).send() };
        database.query('UPDATE usuario SET token = ? WHERE nombre = ? AND password = ?', [token, req.body.usuario, req.body.password], function (err, results, fields) {
            if (!results || !results.changedRows) { return res.send(false) };
            if (err){ console.log(err); return res.status(500).send(err) };
            res.send({token: token});
        })
    });

router.route('/logout')
    .post(function(req, res) {
        if (!req.body.token) { return res.status(400).send() };
        database.query('UPDATE usuario SET token = NULL WHERE token = ?', [req.body.token], function (err, results, fields) {
            if (!results || !results.changedRows) { return res.send(false) };
            if (err){ console.log(err); return res.status(500).send(err) };
            res.send(true)
        })
    });

router.route('/group/:id')
    .get(function(req, res) {
        if (!req.params.id) { return res.status(400).send() };
        database.query('SELECT id, nombre FROM grupo WHERE id = ?', [req.params.id], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/group')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            database.query('SELECT * FROM grupo WHERE id = ?', [query.id], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                res.json(results);
            })
        });
    });

router.route('/group')
    .delete(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            database.query('DELETE FROM grupo WHERE id = ?', [query.id], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                res.json(results);
            });
        });
    });

router.route('/inscripcion/:id')
    .delete(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            if (!req.params.id) { return res.status(400).send() };
            database.query('DELETE FROM inscripcion WHERE id = ?', [req.params.id], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                res.json(results);
            });
        });
    });

router.route('/inscriptos-grupo')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.id) { return res.status(400).send() };
        database.query('SELECT * from inscripcion where idGrupo = ?', [query.id], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/groups')
    .get(function(req, res) {
        database.query('SELECT grupo.*, COUNT(inscripcion.documento) as inscriptos FROM grupo LEFT JOIN inscripcion ON grupo.id = inscripcion.idGrupo GROUP BY grupo.id', [], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        });
    });
    
router.route('/group')
    .post(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            database.query('INSERT INTO grupo (nombre, descripcion, dias, horarios, cupo) VALUES (?, ?, ?, ?, ?)', [req.body.nombre, req.body.descripcion, req.body.dias, req.body.horarios, req.body.cupo], function (err, results, fields) {
                if (err){ console.log(err); res.status(500).send('Ha habido un error, intenta nuevamente o vuelve a iniciar sesión.') };
                res.json(results);
            });
        });
    });

router.route('/group')
    .put(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            database.query('UPDATE grupo SET nombre = ?, descripcion = ?, dias = ?, horarios = ?, cupo = ? WHERE id = ?', [req.body.nombre, req.body.descripcion, req.body.dias, req.body.horarios, req.body.cupo, req.body.id], function (err, results, fields) {
                if (err){ console.log(err); res.status(500).send('Ha habido un error, intenta nuevamente o vuelve a iniciar sesión.') };
                res.json(results);
            });
        });
    });

//admin
router.route('/inscripcion')
    .delete(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.id || !query.token) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            database.query('DELETE FROM inscription WHERE id = ?', [query.id], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                res.json(results);
            });
        });
    });

//public
router.route('/inscripcion/:codigo')
    .delete(function(req, res) {
        if (!req.params.codigo) { return res.status(400).send() };
        database.query('DELETE FROM inscription WHERE codigo = ?', [req.params.codigo], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/inscripcion')
    .post(function(req, res) {
        //random code
        var codigo = Math.floor(100000 + Math.random() * 900000);
        if (!req.body || !req.body.documento || !req.body.nombre || !req.body.fnacimiento || !req.body.edad || !req.body.idGrupo ) { return res.status(400).send() };
        database.query('INSERT INTO inscripcion (documento, nombre, fnacimiento, edad, idGrupo, codigo) VALUES (?, ?, ?, ?, ?, ?)', [req.body.documento, req.body.nombre, req.body.fnacimiento, req.body.edad, req.body.idGrupo, codigo], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json({documento: req.body.documento, nombre: req.body.nombre, fnacimiento: req.body.fnacimiento, edad: req.body.edad, idGrupo: req.body.idGrupo, codigo: codigo});
        })
    });

//register router
app.use(router);

var server = app.listen(8080, function(){
    console.log('Server is listening on port '+server.address().port);
});

