const fs = require("fs");
const validator = require("validator");
const path = "./data";

// cek folder dan buat jika tidak ada
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}

// cek file dan buat jika tidak ada
const dataPath = "./data/contact.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}
const loadContact = () => {
  const file = fs.readFileSync("data/contact.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};
const saveContacts = (nama, email, noHP) => {
  const data = { nama, email, noHP };
  const contacts = loadContact();
  const duplikat = contacts.find((contact) => contact.nama === nama);

  if (duplikat) {
    console.log("nama sama terdeteksi");
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Not email formatted");
      return false;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log("Not a valid phone formatted");
    return false;
  }

  contacts.push(data);
  fs.writeFileSync("data/contact.json", JSON.stringify(contacts));
  console.log("thank you so much");
};

const listContacts = () => {
  const contacts = loadContact();
  contacts.forEach((contact, i) => {
    console.log(`${i + 1} ${contact.nama} - ${contact.noHP}`);
  });
};

const contactDetail = (nama) => {
  const contacts = loadContact();
  // console.log(contacts[0].nama);
  // return false;

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(`${nama} unknown`);
  } else {
    console.log(`Nama = ${contact.nama}, email = ${contact.email}, no = ${contact.noHP}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

  if (contacts.length === newContact.length) {
    console.log(`${nama} unknown`);
    return false;
  }

  fs.writeFileSync("data/contact.json", JSON.stringify(newContact));
  console.log(` ${nama} berhasil dihapus`);
};
module.exports = { saveContacts, listContacts, contactDetail, deleteContact };
