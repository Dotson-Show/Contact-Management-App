const express = require('express');
const db = require('./models/database.js');
const path = require('path');
const session = require('express-session');
const md5 = require('md5');
const bodyParser = require('body-parser');
const SQLiteStore = require('connect-sqlite3')(session);

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

const {
    http_port = 3000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = '!secret#piano',
    SESS_LIFETIME = ONE_WEEK,
} = process.env

const IN_PROD = NODE_ENV === 'production'

const app = express();

app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: new SQLiteStore,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static( './views'));
app.use(express.static(path.join(__dirname, '/views/')));

// Authentication
const redirectToLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/');
        // res.send('<pre><h1>Please Login</h1></pre>')
    } else {
        next();
    }
}

const redirectToDashboard = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/dashboard');
    } else {
        next();
    }
}



// route to index page (login page)
app.get('/', redirectToDashboard, (req, res) => {
    // res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/getSessId', (req, res) => {
    const {userId} = req.session;
    res.json({
        'sessId': userId
    })
});

// route to register page
app.get('/register', redirectToDashboard, (req, res) => {
    res.sendFile(path.join(__dirname + '/views/register.html'));
});

// route to dashboard page
app.get('/dashboard', redirectToLogin, (req, res) => {
    res.sendFile(path.join(__dirname + '/views/dashboard.html'));
});

// Handles login
app.post('/api/login', (req, res) => {
    let errors = [];
    const {userId} = req.session;
    const {email, password} = req.body;
    if (email && password) {
        let sql = 'select * from users where email = ?';
        let params = [email];
        db.get(sql, params, (err, row) => {
            if (!row) {
                res.json({
                    "error": 'Email or Password Mismatch'
                })
                // res.status(400).json({"error":err.message});
                return;
            }
            if (md5(password) != row.password){
                res.json({
                    "error": 'Email or Password Mismatch'
                })
                return;
            }
            req.session.userId = row.user_id;
            
            // return res.redirect('/dashboard');
            
            res.json({
                'message':'success',
                'data':row,
                'sessId': userId
            })
        });
    }
    
});

//handles logout
app.get('/logout', redirectToLogin, (req, res) => {
    
    req.session.destroy(function(err) {
        if (err) {
            console.log(err.message);
            return
        }
        res.clearCookie(SESS_NAME);
        return res.redirect('/');    
    })
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
        res.session.userId = this.lastID; 
        return res.redirect('/dashboard');
        // res.json({
        //     "message": "success",
        //     "data": data,
        //     'sessId': userId
        // })
    });
})



// List all session user contacts
app.get('/api/contacts', (req, res) => {
    const {userId} = req.session;
    let sql = 'select * from contacts where rel_user_id = ?';
    let params = [userId];
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
            res.json({"message":"Deleted Successfuly", rows: this.changes})
    });
})

app.use((req, res) => {
    res.status(404);
});

app.listen(http_port, () => {
    console.log(`Server started at http://localhost:${http_port}`);
});