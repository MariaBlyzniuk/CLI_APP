const contacts = require('./contacts')
// console.log(contacts)

const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
    case "list":
            const data = await contacts.listContacts();
            console.log('listContacts', data);
        break;

    case "get":
            const contact = await contacts.getContactById(id);
            console.log('getContactById', contact);
        break;

    case "add":
            await contacts.addContact(name, email,phone);
        break;

    case "remove":
            await contacts.removeContact(id, price, name,phone);
        break;

    default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

const { hideBin } = require('yargs/helpers')
// const {argv} = yargs(hideBin(process.argv));

console.log(argv);

invokeAction(argv);