
create database carpeta_instruccional;
use carpeta_instruccional;
create table rol (
idrol int auto_increment primary key,
rol varchar(30)
);

create table usuarios (
Id int auto_increment primary key,
Usuario varchar(50) not null,
contrasena varchar(100) not null,
foto blob,
correo varchar(100) not null,
estado ENUM('Activo','Inactivo','Suspendido') not null default ('Activo'),
idrol int not null, 
foreign key (idrol) references rol(idrol)
);

create table profesor(
idprofesor int auto_increment primary key,
idusuario int not null,
dni VARCHAR(15),
nombre varchar(50) not null,
apellidos varchar(100) not null,
grado_academico VARCHAR(100),
fecha_ingreso date default (current_date()),
telefono VARCHAR(15),
foreign key (idusuario) references usuarios (Id)
);


create table coordinador(
idcoordinador int auto_increment primary key,
idusuario int not null,
nombre varchar(50) not null,
apellidos varchar(100) not null,
fecha_ingreso date default (current_date()),
telefono VARCHAR(15),
foreign key (idusuario) references usuarios (Id)
);

create table competencias(
idcompetencia int auto_increment primary key,
nombre varchar(50) not null,
descripcion varchar(100)
);

create table profesor_competencias
(
id int auto_increment primary key,
idprofesor int not null,
idcompetencia int not null,
foreign key (idcompetencia) references competencias(idcompetencia) ,
foreign key (idprofesor) references profesor(idprofesor)
);

create table alumnos (
idalumno int auto_increment primary key,
nombres varchar(50) not null,
apellidos varchar(100) not null,
fecha_inscripcion date default (current_date()),
estado varchar(10) default ('Activo')
);

create table cursos(
idcurso int auto_increment primary key,
nombre varchar(50) not null,
duracion varchar(100) not null,
estado varchar(10) default ('Activo')
) ;


create table aula(
id int auto_increment primary key,
idprofesor int not null,
idcurso int not null,
foreign key (idprofesor) references profesor(idprofesor) ,
foreign key (idcurso) references cursos(idcurso) 
);

CREATE TABLE aula_dias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idaula INT NOT NULL,
  dia ENUM('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  FOREIGN KEY (idaula) REFERENCES aula(id) ON DELETE CASCADE
);

create table aula_alumnos(
    id int auto_increment primary key,
    idaula int not null,
    idalumno int not null,
    foreign key (idaula) references aula(id),
    foreign key (idalumno) references alumnos(idalumno)
);

create table fichas(
id int auto_increment primary key,
nombre_archivo varchar(100),
tipo_archivo varchar(100),
ruta_archivo varchar(100),
fecha_subida date default (current_date()),
idcurso int not null,
idprofesor int not null,
foreign key (idprofesor) references profesor(idprofesor),
foreign key (idcurso) references cursos(idcurso)
);

create table silabos(
id int auto_increment primary key,
nombre_archivo varchar(100),
tipo_archivo varchar(100),
ruta_archivo varchar(100),
fecha_subida date default (current_date()),
idcurso int not null,
idprofesor int not null,
foreign key (idprofesor) references profesor(idprofesor),
foreign key (idcurso) references cursos(idcurso)
);

CREATE TABLE historial_cursos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idaula INT NOT NULL,
  idprofesor INT NOT NULL,
  idcurso INT NOT NULL,
  estado ENUM('Activo','Completado','Eliminado') DEFAULT 'Activo',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table material_apoyo(
id int auto_increment primary key,
nombre_archivo varchar(100),
tipo_archivo varchar(100),
ruta_archivo varchar(100),
fecha_subida date default (current_date()),
idcurso int not null,
idprofesor int not null,
foreign key (idprofesor) references profesor(idprofesor),
foreign key (idcurso) references cursos(idcurso)
);


DELIMITER $$

CREATE TRIGGER trg_insert_historial_cursos
AFTER INSERT ON aula
FOR EACH ROW
BEGIN
  INSERT INTO historial_cursos (idaula, idprofesor, idcurso, estado)
  VALUES (NEW.id, NEW.idprofesor, NEW.idcurso, 'Activo');
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_update_historial_cursos
AFTER UPDATE ON aula
FOR EACH ROW
BEGIN
  IF (OLD.idprofesor <> NEW.idprofesor OR OLD.idcurso <> NEW.idcurso) THEN
    INSERT INTO historial_cursos (idaula, idprofesor, idcurso, estado)
    VALUES (NEW.id, NEW.idprofesor, NEW.idcurso, 'Activo');
  END IF;
END $$

DELIMITER $$
CREATE TRIGGER trg_delete_historial_cursos
AFTER DELETE ON aula
FOR EACH ROW
BEGIN
  INSERT INTO historial_cursos (idaula, idprofesor, idcurso, estado)
  VALUES (OLD.id, OLD.idprofesor, OLD.idcurso, 'Eliminado');
END $$

DELIMITER ;


