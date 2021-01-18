SELECT O.id_item,i.nomItem,O.id_CharacterBanqueGame FROM items i INNER JOIN(itemObtainedBy O, characterBanqueGame H) ON i.id_item = O.id_item AND H.id_character = O.id_characterBanqueGame;

SELECT m.nom_metier FROM items i INNER JOIN(consomableMetierItem C, metiers m) ON C.id_item = i.id_item AND C.id_metier = m.id_metier WHERE i.id_item=1;
