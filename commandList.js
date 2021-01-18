const commandList = {
  isCommand: {
    name: '!!',
    regex: new RegExp(/^!!([a-zA-Z]+)/)
  },
  bankInsertItem: {
    id: 'bankInsertItem',
    name: 'insertItem',
    regex: new RegExp(/^!!bank(InsertItem) \[(\w+)\] ([\d]+)[\s]+([a-zA-Z\s'çéèà]+)\(([\w\W]+)\)/),
    permission: 'ADMINISTRATOR',
    errorMessage: '**Would you mean** \n ***!!bankInsertItem*** [**NameCharacterBank**] **Quantity** **nameOfItem** (**job1CanUseThisItem**/**job2...**/**etc..**)',
    successMessage: '**Item added successfully ☑️**',
    syntaxError: `
      **NameCharacterBank parameter** : accept only [**\`a-zA-Z\`**],
      **Quantity parameter** : accept only **\`number\`**,
      **NameOfItem parameter** : accept **\`a-zA-Z\`**,**\`space\`**,**\`éèçà'\`**,
      **job parameter** : accept **\`( a-zA-Z/ )\`**
    `
  },
  bankUpdateItem: {
    id: 'bankUpdateItem',
    name: 'updateItem',
    regex: new RegExp(/^!!bank(UpdateItem) \[(\w+)\] ([a-zA-Z\s'çéèà]+)[\s]+([\d]+)/),
    permission: 'ADMINISTRATOR',
    errorMessage: '**Would you mean** \n ***!!bankUpdateItem*** [**NameCharacter**] **nameOfItem** **Quantity**',
    successMessage: '**Item updated successfully ☑️**',
    syntaxError: `
      **NameCharacterBank parameter** : accept only [**\`a-zA-Z\`**],
      **NameOfItem parameter** : accept **\`a-zA-Z\`**,**\`space\`**,**\`éèçà'\`**,
      **Quantity parameter** : accept only **\`number\`**,
    `
  },
  bankGetAllItem: {
    id: 'bankGetAllItem',
    name: 'getAllItem',
    regex: new RegExp(/!!bankGetAllItem/),
    permission: 'SEND_MESSAGE',
    errorMessage: '',
    successMessage: 'List of alls Items on guild bank'
  }
}

module.exports = commandList
