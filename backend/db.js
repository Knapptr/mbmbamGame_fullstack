const username = "admin";
const dbname = "Lyrics_guesser";
const password = "adminpassword";
const url = `mongodb+srv://${username}:${password}@cluster0.h2mc4.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = url;
