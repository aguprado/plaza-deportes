CREATE TABLE usuario (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nombre varchar(256) NOT NULL,
  password varchar(256) NOT NULL,
  token varchar(256),
  inscripciones tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE grupo (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nombre varchar(256) NOT NULL,
  descripcion varchar(256) NOT NULL,
  dias varchar(256) NOT NULL,
  horarios varchar(256) NOT NULL,
  cupo int(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE agendaGrupo (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  idGrupo int(10) unsigned NOT NULL,
  idInscripcion int(10) unsigned NULL,
  tomado tinyint(1) NOT NULL DEFAULT 0,
  diahora varchar(256) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idGrupo) REFERENCES grupo(id) ON DELETE CASCADE
);

CREATE TABLE inscripcion (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  documento varchar(15) NOT NULL,
  nombre varchar(256) NOT NULL,
  fnacimiento varchar(256) NOT NULL,
  contacto varchar(256) NOT NULL,
  edad int(5) NOT NULL,
  idAgendaGrupo int(10) unsigned NOT NULL,
  codigo varchar(256) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idAgendaGrupo) REFERENCES agendaGrupo(id) ON DELETE CASCADE
);


INSERT INTO usuario (nombre, password) VALUES ('admin', 'd033e22ae348aeb5660fc2140aec35850c4da997');


/*
INSERT INTO inscripcion (documento, nombre, idGrupo, fnacimiento, edad, codigo) VALUES ('41842930', 'Agustin', 1, '30/5/89', 28, '');
INSERT INTO inscripcion (documento, nombre, idGrupo, fnacimiento, edad, codigo) VALUES ('41842931', 'Agustin1', 1, '30/5/89', 28, '');
INSERT INTO inscripcion (documento, nombre, idGrupo, fnacimiento, edad, codigo) VALUES ('41842932', 'Agustin2', 1, '30/5/89', 28, '');
INSERT INTO inscripcion (documento, nombre, idGrupo, fnacimiento, edad, codigo) VALUES ('41842933', 'Agustin3', 1, '30/5/89', 28, '');
*/

/*
UPDATE grupo ADD COLUMN fechaPublicacion DATE NULL;
*/