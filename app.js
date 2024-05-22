const { type } = require("os");
const { argv } = require("process");
const yargs = require("yargs");

const { saveContacts, listContacts, contactDetail, deleteContact } = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "menambah kontak baru",
    builder: {
      nama: {
        describe: "nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphpne",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      saveContacts(argv.nama, argv.email, argv.nohp);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Menampilkan semua nama dan no hp",
  handler() {
    listContacts();
  },
});

yargs.command({
  command: "detail",
  describe: "Menampilkan semua nama dan no hp dan email",
  builder: {
    nama: {
      describe: "detail nama",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contactDetail(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "Menghapus semua nama dan no hp dan email",
  builder: {
    nama: {
      describe: "detail nama",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
