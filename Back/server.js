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
    password : '41842930',
    //password : '',
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

    //public
router.route('/group/:id')
    .get(function(req, res) {
        if (!req.params.id) { return res.status(400).send() };
        database.query('SELECT id, nombre FROM grupo WHERE id = ?', [req.params.id], function (err, results, fields) {
            var result = results.pop();
            if (!result || !result.id) { return res.status(500).send() };
            var grupo = {id: result.id, nombre: result.nombre, agendaGrupo: []};
            if (err){ console.log(err); return res.status(500).send(err) };
            database.query('SELECT id, diahora, tomado FROM agendaGrupo WHERE idGrupo = ?', [req.params.id], function (err, agendas, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                agendas.forEach(function(agenda) {
                    grupo.agendaGrupo.push(agenda);
                }, this);
                res.json(grupo);
            })
        })
    });
    
    //private
router.route('/group')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.token || !query.id) { return res.status(400).send() };
        validateToken(query.token, function(result) {
            if (!result) { return res.status(401).send() }; 
            database.query('SELECT * FROM grupo WHERE id = ?', [query.id], function (err, results, fields) {
                var result = results.pop();
                var grupo = {id: result.id, nombre: result.nombre, descripcion: result.descripcion, dias: result.dias, horarios: result.horarios, cupo: result.cupo, agendaGrupo: []};
                if (err){ console.log(err); return res.status(500).send(err) };
                database.query('SELECT id, diahora, tomado FROM agendaGrupo WHERE idGrupo = ?', [query.id], function (err, agendas, fields) {
                    if (err){ console.log(err); return res.status(500).send(err) };
                    agendas.forEach(function(agenda) {
                        grupo.agendaGrupo.push(agenda);
                    }, this);
                    res.json(grupo);
                })
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
/*
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
*/

router.route('/inscriptos-grupo')
    .get(function(req, res) {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (!query.id) { return res.status(400).send() };
        database.query('SELECT inscripcion.*, agendaGrupo.diahora from inscripcion INNER JOIN agendaGrupo ON inscripcion.idAgendaGrupo = agendaGrupo.id WHERE agendaGrupo.idGrupo = ?', [query.id], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            res.json(results);
        })
    });

router.route('/groups')
    .get(function(req, res) {
        database.query('SELECT grupo.*, COUNT(agendaGrupo.idInscripcion) as inscriptos FROM grupo LEFT JOIN agendaGrupo ON grupo.id = agendaGrupo.idGrupo GROUP BY grupo.id', [], function (err, results, fields) {
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
                var inserted = 0;
                var groupId = results.insertId;
                for (var index = 0; index < req.body.agendaGrupo.length; index++) {
                    database.query('INSERT INTO agendaGrupo (idGrupo, diahora) VALUES (?, ?)', [groupId, req.body.agendaGrupo[index].diahora], function (err, results, fields) {
                        if (err){ console.log(err); res.status(500).send('Ha habido un error, intenta nuevamente o vuelve a iniciar sesión.') };
                        inserted+=1; if (inserted == req.body.agendaGrupo.length) { res.json(true) };
                    });           
                }
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
            database.query('UPDATE grupo SET nombre = ?, descripcion = ?, dias = ?, horarios = ? WHERE id = ?', [req.body.nombre, req.body.descripcion, req.body.dias, req.body.horarios, req.body.id], function (err, results, fields) {
                var updated = 0;
                for (var index = 0; index < req.body.agendaGrupo.length; index++) {
                    database.query('UPDATE agendaGrupo SET diahora = ? WHERE id = ?', [req.body.agendaGrupo[index].diahora, req.body.agendaGrupo[index].id], function (err, results, fields) {
                        if (err){ console.log(err); res.status(500).send('Ha habido un error, intenta nuevamente o vuelve a iniciar sesión.') };
                        updated+=1; if (updated == req.body.agendaGrupo.length) { res.json(true) };
                    });           
                }
            });
        });
    });
    
//public
router.route('/inscripcion/:codigo')
    .delete(function(req, res) {
        if (!req.params.codigo) { return res.status(400).send() };
        database.query('UPDATE agendaGrupo SET idInscripcion = NULL, tomado = 0 WHERE idInscripcion IN (SELECT id FROM inscripcion WHERE codigo = ?)', [req.params.codigo], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };            
            database.query('DELETE FROM inscripcion WHERE codigo = ?', [req.params.codigo], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                res.send(true);
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
            database.query('DELETE FROM inscripcion WHERE id = ?', [query.id], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };            
                database.query('UPDATE agendaGrupo SET idInscripcion = NULL, tomado = 0 WHERE idInscripcion = ?', [query.id], function (err, results, fields) {
                    if (err){ console.log(err); return res.status(500).send(err) };
                    res.send(true);
                });
            });
        });
    });

router.route('/inscripcion')
    .post(function(req, res) {
        //random code
        var codigo = Math.floor(100000 + Math.random() * 900000);
        if (!req.body || !req.body.idAgenda || !req.body.documento || !req.body.nombre || !req.body.fnacimiento || !req.body.edad || !req.body.diahora ) { return res.status(400).send() };
        database.query('INSERT INTO inscripcion (documento, nombre, fnacimiento, edad, idAgendaGrupo, codigo) VALUES (?, ?, ?, ?, ?, ?)', [req.body.documento, req.body.nombre, req.body.fnacimiento, req.body.edad, req.body.idAgenda, codigo], function (err, results, fields) {
            if (err){ console.log(err); return res.status(500).send(err) };
            database.query('UPDATE agendaGrupo SET idInscripcion = ?, tomado = 1 WHERE id = ?', [results.insertId, req.body.idAgenda], function (err, results, fields) {
                if (err){ console.log(err); return res.status(500).send(err) };
                res.json({documento: req.body.documento, idAgenda: req.body.idAgenda, nombre: req.body.nombre, fnacimiento: req.body.fnacimiento, edad: req.body.edad, diahora: req.body.diahora, codigo: codigo});
            });
        });
    });

//register router
app.use(router);

var server = app.listen(8081, function(){
    console.log('Server is listening on port '+server.address().port);
});

