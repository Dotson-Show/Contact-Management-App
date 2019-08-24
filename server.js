const express = require('express');
const db = require('./models/database.js');
const path = require('path');
const session = require('express-session');
const md5 = require('md5');
const bodyParser = require('body-parser');

const app = express();

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./views/'));

const http_port = 3000;



app.get('/', (req, res) => {
    //res.json({"message":"Ok"})
    // res.sendFile(path.join(__dirname + '/views/index.html'));
});

// List all users
app.get('/api/users', (req, res) => {
    let sql = 'select * from users';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error':err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        });
    });
});

// Get a single user
app.get('/api/user/:id', (req, res) => {
    let sql = 'select * from users where user_id = ?';
    let params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            'message':'success',
            'data':row
        })
    });
});

// Create New user
app.post("/api/user/", (req, res) => {
    let errors=[];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password : md5(req.body.password)
    }
    let sql ='INSERT INTO users (name, phone, email, password) VALUES (?,?,?,?)'
    let params =[data.name, data.phone, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// List all contacts
app.get('/api/contacts', (req, res) => {
    let sql = 'select * from contacts';
    let params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({'error':err.message});
            return;
        }
        res.json({
            'message': 'success',
            'data': rows
        });
    });
});

// Get a single contact
app.get('/api/contact/:id', (req, res) => {
    let sql = 'select * from contacts where contact_id = ?';
    let params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            'message':'success',
            'data':row
        })
    });
});

// Create New Contact
app.post("/api/contact/", (req, res) => {
    let errors=[];
    if (!req.body.name){
        errors.push("No Name specified");
    }
    if (!req.body.phone){
        errors.push("No Mobile number specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        company: req.body.company,
        occupation: req.body.occupation,
        relationship: req.body.relationship,
        photo: req.body.photo
    }
    let sql ='INSERT INTO contacts (name, phone, email, address, company, occupation, relationship, photo) VALUES (?,?,?,?,?,?,?,?)'
    let params =[data.name, data.phone, data.email, data.address, data.company, data.occupation, data.relationship, data.photo]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// Update a contact
app.patch("/api/contact/:id", (req, res) => {
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        company: req.body.company,
        occupation: req.body.occupation,
        relationship: req.body.relationship,
        photo: req.body.photo
    }
    db.run(
        `UPDATE contacts set 
            name = COALESCE(?,name),
            phone = COALESCE(?,phone),
            email = COALESCE(?,email), 
            address = COALESCE(?,address),
            company = COALESCE(?,company),
            occupation = COALESCE(?,occupation),
            relationship = COALESCE(?,relationship),
            photo = COALESCE(?,photo)
            WHERE contact_id = ?`,
        [data.name, data.phone, data.email, data.address, data.company, data.occupation, data.relationship, data.photo, req.params.id],
        (err, result) => {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data
            })
    });
})

// Delete a Contact
app.delete("/api/contact/:id", (req, res) => {
    db.run(
        'DELETE FROM contacts WHERE contact_id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", rows: this.changes})
    });
})

app.use((req, res) => {
    res.status(404);
});

app.listen(http_port, () => {
    console.log(`Server running on port ${http_port}`);
});