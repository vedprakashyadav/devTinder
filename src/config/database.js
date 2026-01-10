const mongoose = require('mongoose');

const connectDB = async () => {
await mongoose.connect('mongodb+srv://namastedev:eQAk1Zrpc0SPelFz@namastenode.iasyenu.mongodb.net/devTinder');
};

module.exports = connectDB;



