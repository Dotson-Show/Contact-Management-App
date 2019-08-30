const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const db = new sqlite3.Database('contactDb.sqlite', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to SQLite Database.');
        // console.log('dropping table contacts');
        // db.run(`DROP TABLE contacts`);
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
        name text NOT NULL,
        phone INTEGER NOT NULL, 
        email text UNIQUE NOT NULL, 
        address text,
        company text,
        occupation text,
        relationship text,
        photo BINARY,
        FOREIGN KEY (rel_user_id)
        REFERENCES users (user_id)
            ON UPDATE RESTRICT
            ON DELETE CASCADE 
        )`,
    (err) => {
        if (err) {
            console.log(`Table contacts not created: ${err.message}`);
        }else{
            console.log('Table contacts created, creating some rows');
            var insert = 'INSERT INTO contacts (rel_user_id, name, phone, email, address, company, occupation, relationship, photo) VALUES (?,?,?,?,?,?,?,?,?)';
            db.run(insert, ["1", "John Doe", "08065342345", "johndoe@test.com", "Lagos, Nigeria", "Huawei", "RNO", "Friend"]);
            db.run(insert, ["1", "James Arthur", "07086283471", "jamesarthur@test.com", "Lagos, Nigeria", "Frotech", "Software Developer", "Family"]);
            db.run(insert, ["1", "James More", "07086284356", "jamesmore@test.com", "Lagos, Nigeria", "Frotech", "Software Developer", "Co-Worker"]);
            db.run(insert, ["2", "Henry Flow", "07086285566", "henryflow@test.com", "Lagos, Nigeria", "Frotech", "Software Developer", "Co-Worker"]);
            db.run(insert, ["2", "King James", "07086286710", "kingjames@test.com", "Lagos, Nigeria", "Frotech", "Software Developer", "Co-Worker"]);
        }
    });  

}

module.exports = db;