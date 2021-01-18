const verifyDatabase = {
  isExist: (datas = [], errorMessage = '') => {
    if (datas.length === 0 && errorMessage !== '') throw new Error(`${errorMessage}`)
    if (datas.length === 0) return false
    return datas
  },
  isExistCharacter: (datas, pseudo) => {
    if (datas.length === 0) throw new Error(`There is no character bank named ${pseudo}`)
    return datas
  },
  isExistItemOnCharacter: (datas = [], nameItem = '', pseudoCharacter = '') => {
    if (datas.length === 0) return false
    console.log('nameItem: ', nameItem)
    throw new Error(`item [ ___${nameItem}___ ] already exist on ${pseudoCharacter} character, you can update its quantity`)
  },

  isJobNotFound: (jobs) => {
    if (jobs.indexOf(false) !== -1) throw new Error('job not found')
    return jobs
  },
  isEmptyBank: (bankItems) => {
    if (bankItems.length === 0) throw new Error('Bank is empty sorry 😕')
    return bankItems
  }
}

module.exports = verifyDatabase
