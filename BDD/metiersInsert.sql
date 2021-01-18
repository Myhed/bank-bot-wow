use guildBank;

LOCK TABLES `metiers` WRITE;
/*!40000 ALTER TABLE `metiers` DISABLE KEYS */;
INSERT INTO `metiers` VALUES (1,'Forge','Artisanat','Fg'),(2,'Minage','Collecte','Mg'),(3,'Travail du cuir','Artisanat','tdc'),(4,'Dépeçage','Collecte','Dp'),(5,'Alchimie','Artisanat','Ah'),(6,'Herboristerie','Collecte','Hb'),(7,'Couture','Artisanat','Ct'),(8,'Enchanteur','Artisanat','Eh'),(9,'ingénieur','Artisanat','Ig');
/*!40000 ALTER TABLE `metiers` ENABLE KEYS */;
UNLOCK TABLES;

