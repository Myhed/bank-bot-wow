
//   let req
//   let resultInsertedItem
//   let keyIdItem
//   itemDatasToInsert[3] = parseInt(itemDatasToInsert[3], 10)
//   return db.then(request => {
//     console.log('titi')
//     req = request
//     return req.query(`SELECT id_item FROM items WHERE nomItem = "${itemDatasToInsert[4]}"`).then(itemExist => {
//       if (itemExist.length === 0) {
//         return req.query(`INSERT INTO items(id_item,nomItem) VALUES(null,"${itemDatasToInsert[4]}")`)
//       } else {
//         return req.query(`SELECT id_character FROM characterBanqueGame WHERE pseudo = "${itemDatasToInsert[2]}"`)
//           .then(idCharacter => {
//             if (idCharacter.length === 0) return reject(new Error(`There are no character bank named ${itemDatasToInsert[2]}`))
//             return req.query(`SELECT id_item FROM itemObtainedBy WHERE id_item=${itemExist[0].id_item} AND id_characterBanqueGame=${idCharacter[0].id_character}`)
//               .then(itemHasBeenAlreadyStockedOnThisCharacter => {
//                 if (itemHasBeenAlreadyStockedOnThisCharacter.length >= 1) {
//                   return reject(new Error(`this item is already been stocked on character ${itemDatasToInsert[2]} you just need to update its quantity with command !!bankUpdateItem`))
//                 }
//                 return itemExist
//               })
//           })
//       }
//     })
//   }).then(resultInserted => {
//     if (typeof resultInserted === 'undefined') return
//     console.log(resultInserted)
//     resultInsertedItem = resultInserted
//     return itemDatasToInsert[5].split('/').map(nameMetier => {
//       const substrNameMetier = nameMetier.substr(0, 3)
//       return req.query(`SELECT id_metier FROM metiers WHERE nom_metier LIKE "%${substrNameMetier}%" OR tag = "${nameMetier}"`)
//     })
//   }).then(idMetiersPromises => {
//     if (typeof idMetiersPromises === 'undefined') return
//     Promise.all(idMetiersPromises)
//       .then(idMetiers => {
//         console.log('lolol')
//         const hasMetierNotFound = idMetiers.map(idMetier => idMetier.length > 0 ? idMetier : false)
//         console.log('hasMetierNotFound: ', hasMetierNotFound)
//         if (hasMetierNotFound.indexOf(false) === -1) {
//           console.log(resultInsertedItem)
//           keyIdItem = typeof resultInsertedItem.insertId !== 'undefined' ? resultInsertedItem.insertId : resultInsertedItem[0].id_item
//           idMetiers.forEach(idMetier => {
//             req.query(`INSERT INTO consomableMetierItem(id_metier, id_item) VALUES("${idMetier[0].id_metier}",${keyIdItem})`)
//           })
//           req.query(`SELECT id_character FROM characterBanqueGame WHERE pseudo = "${itemDatasToInsert[2]}"`).then(idCharacter => {
//             return resolve(req.query(`INSERT INTO itemObtainedBy(id_item, id_characterBanqueGame, quantite) VALUES(${keyIdItem},${idCharacter[0].id_character},${itemDatasToInsert[3]})`))
//           })
//         } else {
//           return req.query('SELECT nom_metier FROM metiers').then(nomsMetier => {
//             let message = '** you insered unsupported job. you should use: '
//             nomsMetier.forEach((nomMetier, index) => {
//               const addWord = (index + 1) === nomsMetier.length ? '`' + nomMetier.nom_metier + '`**' : '`' + nomMetier.nom_metier + '`, '
//               message += addWord
//             })
//             return reject(new Error(message))
//           })
//         }
//       })
//       .catch((e) => {
//         throw e
//       })
//   })
