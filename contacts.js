const fs = require('fs').promises;
const path = require('path')

const contactsPath = path.join(__dirname, './db/contacts.json');
// console.log(contactsPath);


async function listContacts() {
    const dataString = await fs.readFile(contactsPath, 'utf8');
    const data = JSON.parse(dataString);
    return data;
}

async function getContactById(id) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === id);
    return contact ? contact : null;
}

async function removeContact(id) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);

    const deleteContact = allContacts[index];
    if(index !== -1) {
        allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    }
    return deleteContact ? deleteContact : null;
}

async function addContact(name, email, phone) {
    const newContact = {
        name: name,
        email: email,
        phone: phone
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};