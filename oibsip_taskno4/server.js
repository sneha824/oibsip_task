const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = 3000;


const users = {};


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('public')); 
app.use(express.static('views')); 


app.get('/', (req, res) => {
    res.redirect('/login.html'); 
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.send('Username already exists. Please choose another.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    res.send('Registration successful! <a href="/login.html">Login here</a>');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user) {
        return res.send('User not found! Please <a href="/register.html">register</a>.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid password. <a href="/login.html">Try again</a>.');
    }
});


app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.send(`
        <h1>Welcome ${req.session.user}!</h1>
        <a href="/logout">Logout</a>
    `);
});


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login.html');
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
