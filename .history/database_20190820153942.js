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
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text,
        phone int, 
        email text UNIQUE, 
        password text, 
        CONSTRAINT email_unique UNIQUE (email)
        )`, 
        (err) => {
            if (err) {
                console.log('Table users already exist!');
            } else {
                console.log('Table users created, creating some rows.....');
                let insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin", "08065342345", "admin@test.com", md5(adminpass)]);
                
            }
        } 
        );
    console.log("creating database table contacts");
    db.run();
}