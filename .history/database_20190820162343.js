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
        user_id int(11) NOT NULL PRIMARY KEY AUTOINCREMENT,
        name text,
        phone int(16) NOT NULL UNIQUE,
        email varchar(25) NOT NULL UNIQUE,
        password varchar(25) DEFAULT NULL
        )`, 
        (err) => {
            if (err) {
                console.log('Table users already exist!');
            } else {
                console.log('Table users created, creating some rows.....');
                let insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin", "08065342345", "admin@test.com", md5(adminpass)]);
                db.run(insert, ["user1", "07086283471", "user1@test.com", md5(user1pass)]);
            }
        } 
        );
    console.log("creating database table contacts");
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        contact_id int(11) NOT NULL PRIMARY KEY AUTOINCREMENT,
        userId int(11) DEFAULT NOT NULL KEY,
        firstName text NOT NULL,
        lastName text NOT NULL,
        workInfo text NOT NULL,
        mobilePhone int(16) NOT NULL,
        workPhone int(16),
        address text,
        email varchar(25) NOT NULL,
        photo varchar(255),
        dateAdded datetime DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT contacts_unique_1 FOREIGN KEY (userId) REFERENCES user (user_id);
        )`, 
        (err) => {
            if (err) {
                console.log('Table users already exist!');
            } else {
                console.log('Table users created, creating some rows.....');
                let insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                db.run(insert, ["admin", "08065342345", "admin@test.com", md5(adminpass)]);
                db.run(insert, ["user1", "07086283471", "user1@test.com", md5(user1pass)]);
            }
        } 
        );
}