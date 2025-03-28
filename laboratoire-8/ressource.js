const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cookie_parser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookie_parser());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

let users = {};
let tokens = {};

//POST /users créer un utilisateur
app.post('/users', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === undefined 
        || password === undefined
        || username === '' 
        || password === '') {
        res.status(400).send('Fields username and password are required');
        return;
    }
    else if (users[username] !== undefined) {
        res.status(400).send('Username already exists');
        return;
    }
    else {
        users[username] = password;
        res.status(200).send('User ' + username + ' created');
    }
});

//GET /login pour générer la page de login
app.get('/login', (req, res) => {
    res.render('login');
});

//POST /login pour connecter un utilisateur
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(users[username] === password) {
        const token = uuidv4();
        tokens[token] = username;
        res.status(200).send({
            token: token
        })
    } else {
        res.status(401).send('Invalid credentials');
    }
});


//GET /profile pour afficher le profil de l'utilisateur
app.get('/profile', (req, res) => {
    const token = req.cookies.user_token;
    if (tokens[token] !== undefined) {
        res.render('profile', { username: tokens[token] });
    } else {
        res.redirect('/login');
    }
});