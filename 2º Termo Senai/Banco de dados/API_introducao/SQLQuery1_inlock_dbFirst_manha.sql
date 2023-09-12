Create DATABASE inlock_games_dbFisrst_manha

USE inlock_games_dbFisrst_manha

Create TABLE Estudio
(
	IdEstudio UNIQUEIDENTIFIER PRIMARY KEY,
	Nome VARCHAR (100) NOT NULL
)

Create TABLE Jogo
(
	IdJogo UNIQUEIDENTIFIER PRIMARY KEY,
	IdEstudio UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Estudio(IdEstudio),
	Nome VARCHAR (100) NOT NULL,
	Descricao VARCHAR (100) NOT NULL,
	DataLancamento DATE NOT NULL,
	Valor SMALLMONEY NOT NULL
)

CREATE TABLE TiposUsuario
(
	IdTipoUsuario UNIQUEIDENTIFIER PRIMARY KEY,
	Titulo VARCHAR(100) NOT NULL
)

CREATE TABLE Usuario
(
	IdUsuario UNIQUEIDENTIFIER PRIMARY KEY,
	IdTipoUsuario UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TiposUsuario(IdTipoUsuario),
	Email VARCHAR(100) NOT NULL,
	Senha VARCHAR(100) NOT NULL
)

	INSERT INTO Estudio 
	VALUES (NEWID(),'SENAI'),(NEWID(),'SESI'),(NEWID(),'SEBRAE')

	SELECT *FROM Estudio

	INSERT INTO Jogo 
	VALUES (NEWID(),'C78A5178-2A4E-464F-A761-2BC1824CC75C','PING-PONG','JOGO LEGAL', '2023-01-01', 500),
		   (NEWID(),'8E794CCC-C374-4DAC-B5F6-BF2FA8F68AAE','JUCAMON','CA�A POKEMON', '2022-03-23',2.99)

	SELECT *FROM Jogo

	INSERT INTO TiposUsuario
	VALUES (NEWID(),'administrador'),(NEWID(),'comum')

	SELECT * FROM TiposUsuario

	INSERT INTO Usuario
	VALUES (NEWID(),'8185FF12-EF0B-400A-BD9E-2BCA328011C8','adm@adm.com','admin'),
		   (NEWID(),'1A58ACB8-E4F4-4218-99B4-AF4A68959183','comun@comum.com','comum')

	SELECT * FROM Usuario