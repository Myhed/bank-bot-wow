const db = require('./database')
const { isExistItemOnCharacter, isJobNotFound, isEmptyBank } = require('./verifyDatabase')
const databaseFunction = {
  request: async () => await db,
  getIdCharacterBankByPseudo: async (pseudo = '') => {
    const request = await db
    const idCharacter = await request.query('SELECT id_character FROM characterBanqueGame WHERE pseudo = ?', [pseudo])
      .catch(e => {
        throw e
      })
    return idCharacter
  },
  getIdItemByName: async (itemName) => {
    const request = await db
    const idItem = await request.query('SELECT id_item FROM items WHERE nomItem = ?', [itemName])
      .catch(e => {
        throw e
      })
    return idItem
  },
  getItemOnCharacter: async (idCharacter, idItem) => {
    const request = await db
    const itemObtainedBy = await request.query('SELECT id_item FROM itemObtainedBy WHERE id_item = ? AND id_characterBanqueGame = ?', [idItem, idCharacter])
      .catch(e => {
        throw e
      })
    return itemObtainedBy
  },
  insertItemOnDatabase: async (nameItem, jobs, idItem, idCharacter, pseudoCharacter) => {
    const request = await db
    if (idItem) {
      const itemOnCharacter = await databaseFunction.getItemOnCharacter(idCharacter[0].id_character, idItem[0].id_item)
        .catch(e => {
          throw e
        })
      isExistItemOnCharacter(itemOnCharacter, nameItem, pseudoCharacter)
      return idItem
    }
    const insertedItem = await request.query('INSERT INTO items(id_item,nomItem) VALUES(?,?)', [null, nameItem])
      .catch(e => {
        throw e
      })
    await databaseFunction.insertJobsItem(insertedItem.insertId, jobs).catch(e => {
      throw e
    })
    return insertedItem
  },
  insertJobsItem: async (idItem, jobs) => {
    const request = await db
    const jobsArray = jobs.split('/')
    if (jobsArray.length > 1) {
      const idsJobsPromises = jobsArray
        .map(async jobName => await databaseFunction.getIdMetierByName(jobName).catch(e => { throw e }))
      const idJobs = await Promise.all(idsJobsPromises)
      const findJobsNotFound = isJobNotFound(idJobs.map(idJob => idJob.length > 0 ? idJob : false))
      if (findJobsNotFound instanceof Error) throw findJobsNotFound
      else {
        idJobs.forEach(async idJob => {
          await request.query('INSERT INTO consomableMetierItem(id_metier,id_item) VALUES(?,?)', [idJob[0].id_metier, idItem])
            .catch(e => {
              throw e
            })
        })
      }
      return
    }
    const idJob = await databaseFunction.getIdMetierByName(jobs).catch(e => { throw e })
    await request.query('INSERT INTO consomableMetierItem(id_metier,id_item) VALUES(?,?)', [idJob[0].id_metier, idItem])
      .catch(e => {
        throw e
      })
  },
  getIdMetierByName: async (nameMetier) => {
    const request = await db
    const substrNameMetier = nameMetier.substr(0, 3)
    return await request.query(`SELECT id_metier FROM metiers WHERE nom_metier LIKE "%${substrNameMetier}%" OR tag = "${nameMetier}"`).catch(e => {
      throw e
    })
  },
  getAllMetiers: async () => {
    const request = await db
    return await request.query('SELECT * FROM metiers')
  },
  insertItemOnCharacter: async (idItem, idCharacter, quantity) => {
    const request = await db
    return await request.query('INSERT INTO itemObtainedBy(id_item, id_characterBanqueGame, quantite) VALUES (?,?,?)', [idItem, idCharacter[0].id_character, parseInt(quantity, 10)])
      .catch(e => {
        throw e
      })
  },
  getAllItem: async () => {
    const request = await db
    const items = await request.query(`
        SELECT O.id_item,i.nomItem,O.id_CharacterBanqueGame, O.quantite FROM items i 
        INNER JOIN(itemObtainedBy O, characterBanqueGame H) 
        ON i.id_item = O.id_item AND H.id_character = O.id_characterBanqueGame 
        ORDER BY i.id_item, O.id_characterBanqueGame ASC`)
    let idCharacter
    let idItem
    let namesMetiers
    const contentBank = await Promise.all(items.map(async (item, index) => {
      let nameCharacter
      if (typeof idCharacter === 'undefined' || idCharacter !== item.id_CharacterBanqueGame) {
        nameCharacter = await databaseFunction.getNameCharacterBankById(items[index].id_CharacterBanqueGame).catch(e => { throw e })
      }
      if (typeof idItem === 'undefined' || idItem !== items[index].id_item) {
        const idMetiers = await databaseFunction.getIdMetierByIdItem(items[index].id_item)
        namesMetiers = await Promise.all(idMetiers.map(async idMetier => {
          const namesMetiers = await databaseFunction.getNameMetierById(idMetier.id_metier).catch(e => { throw e })
          return namesMetiers[0].nom_metier
        }))
      }
      idItem = items[index].id_item
      idCharacter = items[index].id_CharacterBanqueGame
      console.log('items: ', items)
      return `${items[index].quantite} ${items[index].nomItem} ${namesMetiers.join('/')} ${nameCharacter[0].pseudo}`
    }))
    return isEmptyBank(contentBank.join('\n'))
  },
  getIdMetierByIdItem: async (idItem) => {
    const request = await db
    return request.query('SELECT id_metier FROM consomableMetierItem WHERE id_item = ?', [idItem])
  },
  getNameMetierById: async (idMetier) => {
    const request = await db
    return request.query('SELECT nom_metier FROM metiers WHERE id_metier = ?', [idMetier])
      .catch(e => {
        throw e
      })
  },
  getNameCharacterBankById: async (idCharacterBanqueGame) => {
    const request = await db
    return request.query('SELECT pseudo FROM characterBanqueGame WHERE id_character = ?', [idCharacterBanqueGame])
      .catch(e => {
        throw e
      })
  }
}

module.exports = databaseFunction
