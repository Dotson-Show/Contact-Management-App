const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const db = new sqlite3.Database('contactDb.sqlite', (err) => {
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
    console.log("creating database tables");
    db.run(`CREATE TABLE users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text, 
        phone INTEGER,
        email text UNIQUE, 
        password text 
        )`,
    (err) => {
        if (err) {
            console.log(`Table users not created: ${err.message}`);
        }else{
            console.log('Table users created, creating some rows');
            var insert = 'INSERT INTO users (name, phone, email, password) VALUES (?,?,?,?)';
            db.run(insert, ["admin", "08065342345", "admin@example.com",md5("adminpass")]);
            db.run(insert, ["user1", "07086283471", "user1@example.com",md5("user123456")]);
        }
    });  

    db.run(`CREATE TABLE contacts (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        rel_user_id INTEGER,
        name text,
        phone INTEGER, 
        email text UNIQUE, 
        address text,
        company text,
        occupation text,
        relationship text,
        photo text 
        )`,
    (err) => {
        if (err) {
            console.log(`Table contacts not created: ${err.message}`);
        }else{
            console.log('Table contacts created, creating some rows');
            var insert = 'INSERT INTO contacts (name, phone, email, address, company, occupation, relationship, photo) VALUES (?,?,?,?,?,?,?,?)';
            db.run(insert, ["John Doe", "08065342345", "johndoe@test.com", "Lagos, Nigeria", "Huawei", "RNO", "Friends"]);
            db.run(insert, ["James Arthur", "07086283471", "jamesarthur@test.com", "Lagos, Nigeria", "Frotech", "Software Developer", "Family"]);
        }
    });  

}

module.exports = db;