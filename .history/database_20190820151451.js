const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const db = new sqlite3.Database(db.sqlite, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to SQLite Database.');
        createTables();
    }
});

const createTables = () => {
    console.log("creating database table users");
    db.run();
    console.log("creating database table contacts");
    db.run();
}