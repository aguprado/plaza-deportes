CREATE TABLE grupo (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  nombre varchar(256) NOT NULL,
  descripcion varchar(256) NOT NULL,
  dias varchar(256) NOT NULL,
  horarios varchar(256) NOT NULL,
  cupos int(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);