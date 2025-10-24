
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

CREATE TABLE historial (
  idhistorial INT AUTO_INCREMENT PRIMARY KEY,
  tipo_operacion VARCHAR(10) NOT NULL, 
  fecha_operacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  idaula INT,
  profesor_nombre VARCHAR(100),
  curso_nombre VARCHAR(100),
  dias TEXT,
  cantidad_alumnos INT,
  FOREIGN KEY (idaula) REFERENCES aula(id)
);


create table material_apoyo(
id int auto_increment primary key,
nombre_archivo varchar(100),
tipo_archivo varchar(100),
ruta_archivo varchar(100),
fecha_subida date default (current_date()),
idcurso int not null,
idprofesor int not null,
estado enum('Aceptado','Rechazado','Pendiente') default 'Pendiente',
foreign key (idprofesor) references profesor(idprofesor),
foreign key (idcurso) references cursos(idcurso)
);

CREATE TABLE asistencia (
    idasistencia INT AUTO_INCREMENT PRIMARY KEY,
    idalumno INT NOT NULL,
    idaula INT NOT NULL,
    fecha DATE NOT NULL,
    estado ENUM('Presente', 'Tarde', 'Ausente', 'Justificado') NOT NULL DEFAULT 'Ausente',
    observacion VARCHAR(255),
    FOREIGN KEY (idalumno) REFERENCES alumnos(idalumno),
    FOREIGN KEY (idaula) REFERENCES aula(id)
);

create table registro_desempeño
(
id int auto_increment primary key,
idprofesor int not null,
nombre varchar(50) not null,
apellidos varchar(50) not null,
grado_academico varchar(50),
foreign key (idprofesor) references profesor(idprofesor)
)



DELIMITER $$

CREATE TRIGGER aula_insert
AFTER INSERT ON aula
FOR EACH ROW
BEGIN
    DECLARE v_profesor_nombre VARCHAR(100);
    DECLARE v_curso_nombre VARCHAR(100);
    DECLARE v_dias TEXT;
    DECLARE v_cantidad_alumnos INT;
    
    SELECT CONCAT(nombre, ' ', apellidos)
    INTO v_profesor_nombre
    FROM profesor
    WHERE idprofesor = NEW.idprofesor;
    
    SELECT nombre
    INTO v_curso_nombre
    FROM cursos
    WHERE idcurso = NEW.idcurso;
    
    SELECT GROUP_CONCAT(CONCAT(dia, ' (', hora_inicio, '-', hora_fin, ')') SEPARATOR ', ')
    INTO v_dias
    FROM aula_dias
    WHERE idaula = NEW.id;

    
    SELECT COUNT(*)
    INTO v_cantidad_alumnos
    FROM aula_alumnos
    WHERE idaula = NEW.id;

    
    INSERT INTO historial (tipo_operacion, idaula, profesor_nombre, curso_nombre, dias, cantidad_alumnos)
    VALUES ('INSERT', NEW.id, v_profesor_nombre, v_curso_nombre, v_dias, v_cantidad_alumnos);
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER aula_update
AFTER UPDATE ON aula
FOR EACH ROW
BEGIN
    DECLARE v_profesor_nombre VARCHAR(100);
    DECLARE v_curso_nombre VARCHAR(100);
    DECLARE v_dias TEXT;
    DECLARE v_cantidad_alumnos INT;

    SELECT CONCAT(nombre, ' ', apellidos)
    INTO v_profesor_nombre
    FROM profesor
    WHERE idprofesor = NEW.idprofesor;

    SELECT nombre
    INTO v_curso_nombre
    FROM cursos
    WHERE idcurso = NEW.idcurso;

    SELECT GROUP_CONCAT(CONCAT(dia, ' (', hora_inicio, '-', hora_fin, ')') SEPARATOR ', ')
    INTO v_dias
    FROM aula_dias
    WHERE idaula = NEW.id;

    SELECT COUNT(*)
    INTO v_cantidad_alumnos
    FROM aula_alumnos
    WHERE idaula = NEW.id;

    INSERT INTO historial (tipo_operacion, idaula, profesor_nombre, curso_nombre, dias, cantidad_alumnos)
    VALUES ('UPDATE', NEW.id, v_profesor_nombre, v_curso_nombre, v_dias, v_cantidad_alumnos);
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER aula_delete
AFTER DELETE ON aula
FOR EACH ROW
BEGIN
    DECLARE v_profesor_nombre VARCHAR(100);
    DECLARE v_curso_nombre VARCHAR(100);
    DECLARE v_dias TEXT;
    DECLARE v_cantidad_alumnos INT;

    SELECT CONCAT(nombre, ' ', apellidos)
    INTO v_profesor_nombre
    FROM profesor
    WHERE idprofesor = OLD.idprofesor;

    SELECT nombre
    INTO v_curso_nombre
    FROM cursos
    WHERE idcurso = OLD.idcurso;

    SELECT GROUP_CONCAT(CONCAT(dia, ' (', hora_inicio, '-', hora_fin, ')') SEPARATOR ', ')
    INTO v_dias
    FROM aula_dias
    WHERE idaula = OLD.id;

    SELECT COUNT(*)
    INTO v_cantidad_alumnos
    FROM aula_alumnos
    WHERE idaula = OLD.id;

    INSERT INTO historial (tipo_operacion, idaula, profesor_nombre, curso_nombre, dias, cantidad_alumnos)
    VALUES ('DELETE', OLD.id, v_profesor_nombre, v_curso_nombre, v_dias, v_cantidad_alumnos);
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER insert_dias
AFTER INSERT ON aula_dias
FOR EACH ROW
BEGIN
    DECLARE v_dias TEXT;

    SELECT GROUP_CONCAT(CONCAT(dia, ' (', hora_inicio, '-', hora_fin, ')') SEPARATOR ', ')
    INTO v_dias
    FROM aula_dias
    WHERE idaula = NEW.idaula;

    UPDATE historial
    SET dias = v_dias
    WHERE idaula = NEW.idaula
    ORDER BY idhistorial DESC
    LIMIT 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER update_dias
AFTER UPDATE ON aula_dias
FOR EACH ROW
BEGIN
    DECLARE v_dias TEXT;

    SELECT GROUP_CONCAT(CONCAT(dia, ' (', hora_inicio, '-', hora_fin, ')') SEPARATOR ', ')
    INTO v_dias
    FROM aula_dias
    WHERE idaula = NEW.idaula;

    UPDATE historial
    SET dias = v_dias
    WHERE idaula = NEW.idaula
    ORDER BY idhistorial DESC
    LIMIT 1;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER delete_dias
AFTER DELETE ON aula_dias
FOR EACH ROW
BEGIN
    DECLARE v_dias TEXT;

    SELECT GROUP_CONCAT(CONCAT(dia, ' (', hora_inicio, '-', hora_fin, ')') SEPARATOR ', ')
    INTO v_dias
    FROM aula_dias
    WHERE idaula = OLD.idaula;

    UPDATE historial
    SET dias = v_dias
    WHERE idaula = OLD.idaula
    ORDER BY idhistorial DESC
    LIMIT 1;
END$$

DELIMITER ;
