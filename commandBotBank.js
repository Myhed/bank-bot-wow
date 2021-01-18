const { getIdCharacterBankByPseudo, getIdItemByName, insertItemOnDatabase, insertItemOnCharacter, getAllItem } = require('./databaseFunc')
const { isExistCharacter, isExist } = require('./verifyDatabase')
const commandBotBank = {
  insertItem: async (itemDatasToInsert) => {
    const [nameCharacterBanque, quantity, nameItem, jobs] = itemDatasToInsert.splice(2, itemDatasToInsert.length)
    let idItem
    let idCharacter = await getIdCharacterBankByPseudo(nameCharacterBanque)
      .catch(e => {
        throw e
      })
    idCharacter = isExistCharacter(idCharacter, nameCharacterBanque)
    const itemExist = isExist(await getIdItemByName(nameItem))
    console.log('itemExist: ', itemExist)
    idItem = await insertItemOnDatabase(nameItem, jobs, itemExist, idCharacter, nameCharacterBanque).catch(e => { throw e })
    console.log('idItem:', await idItem)
    console.log('zebiIdItem: ', typeof idItem)
    idItem = typeof await idItem.insertId === 'undefined' ? await idItem[0].id_item : await idItem.insertId
    console.log('idItem: ', idItem)
    insertItemOnCharacter(idItem, idCharacter, quantity).catch(e => {
      throw e
    })
  },
  getAllItem: async () => {
    return await getAllItem()
  },
  updateItem: () => {

  }
}

module.exports = commandBotBank
