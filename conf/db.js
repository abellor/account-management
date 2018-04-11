
const DBuser = "admin";
const DBpassword = "pymes100417!";
const DBport = 27017;
const DBdb = "accounts";


exports.url = `mongodb://${DBuser}:${DBpassword}@localhost:${DBport}/${DBdb}`
