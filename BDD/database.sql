DROP DATABASE IF EXISTS guildBank;
CREATE DATABASE guildBank;

use guildBank;

DROP TABLE IF EXISTS membres;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS retraitItems;
DROP TABLE IF EXISTS metiers;
DROP TABLE IF EXISTS consomableMetierItem;
DROP TABLE IF EXISTS characterBanqueGame;
DROP TABLE IF EXISTS itemObtainedBy;

CREATE TABLE membres(
  id_membre INT(255) PRIMARY KEY AUTO_INCREMENT,
  pseudo VARCHAR(255) NOT NULL UNIQUE,
  grade VARCHAR(255) NOT NULL
);

CREATE TABLE characterBanqueGame(
  id_character INT(255) PRIMARY KEY AUTO_INCREMENT,
  pseudo VARCHAR(255) NOT NULL
);

CREATE TABLE items(
  id_item INT(255) PRIMARY KEY AUTO_INCREMENT,
  nomItem VARCHAR(255) not null UNIQUE,
  dateInsert BIGINT UNSIGNED DEFAULT UNIX_TIMESTAMP() 
);

CREATE TABLE itemObtainedBy(
  id_item INT(255),
  id_characterBanqueGame INT(255),
  quantite INT(255) NOT NULL,
  dateObtainItem BIGINT UNSIGNED DEFAULT UNIX_TIMESTAMP(),
  PRIMARY KEY(id_item, id_characterBanqueGame),
  CONSTRAINT `fk_itemObtainBy_id_item` FOREIGN KEY(`id_item`) REFERENCES items(`id_item`),
  CONSTRAINT `fk_itemObtainBy_id_characterBanqueGame` FOREIGN KEY(`id_characterBanqueGame`) REFERENCES characterBanqueGame(`id_character`)
);

CREATE TABLE retraitItems(
    id_retrait INT(255) PRIMARY KEY AUTO_INCREMENT,
    id_item INT(255) not null,
    id_membre INT(255) not null,
    dateRetrait BIGINT UNSIGNED DEFAULT UNIX_TIMESTAMP(),
    CONSTRAINT `fk_id_item` FOREIGN KEY(`id_item`) REFERENCES items(`id_item`),
    CONSTRAINT `fk_id_membre` FOREIGN KEY(`id_membre`) REFERENCES membres(`id_membre`)
);

CREATE TABLE metiers(
  id_metier INT(255) PRIMARY KEY AUTO_INCREMENT,
  nom_metier VARCHAR(255) NOT NULL,
  typeMetier VARCHAR(255) NOT NULL,
  tag VARCHAR(255) NOT NULL
);

CREATE TABLE consomableMetierItem(
  id_metier INT(255),
  id_item INT(255),
  PRIMARY KEY(id_metier, id_item),
  CONSTRAINT `fk_consomableMetierItem_id_item` FOREIGN KEY(`id_item`) REFERENCES items(`id_item`),
  CONSTRAINT `fk_consomableMetierItem_id_metier` FOREIGN KEY(`id_metier`) REFERENCES metiers(`id_metier`)
);