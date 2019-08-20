const sqlite3 = require('sqlite3').verbose();
import md5 from 'md5';

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
                let insert = 'INSERT INTO users (name, phone, email, password) VALUES (?,?,?,?)';
                db.run(insert, ["admin", "08065342345", "admin@test.com", md5(adminpass)]);
                db.run(insert, ["user1", "07086283471", "user1@test.com", md5(user1pass)]);
            }
        } 
        );
    console.log("creating database table contacts");
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
        contact_id int(11) NOT NULL PRIMARY KEY AUTOINCREMENT,
        userId int(11) DEFAULT NOT NULL KEY,
        name text NOT NULL,
        phone int(16) NOT NULL,
        email varchar(25) NOT NULL UNIQUE,
        address text,
        company text,
        occupation text NOT NULL,
        relationship text,
        photo varchar(200),
        date_added datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
        CONSTRAINT contacts_unique_user FOREIGN KEY (userId) REFERENCES user (user_id);
        )`, 
        (err) => {
            if (err) {
                console.log('Table contacts already exist!');
            } else {
                console.log('Table contacts created, creating some rows.....');
                let insert = 'INSERT INTO contacts (name, phone, email, address, company, occupation, relationship) VALUES (?,?,?,?,?,?,?)';
                db.run(insert, ["John Doe", "08065342345", "johndoe@test.com", "Lagos, Nigeria", "Huawei", "RNO", "Friends"]);
                db.run(insert, ["James Arthur", "07086283471", "jamesarthur@test.com", "Lagos, Nigeria", "Frotech", "Software Developer", "Family"]);
            }
        } 
        );
}

export default db;