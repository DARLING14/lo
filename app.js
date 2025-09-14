// app.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

// فەرموودنی پاسۆرد (hash بکە)
const plainPassword = "7/7/2025";
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

// Login form page
app.get('/index22.html', (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="password" name="password" placeholder="Enter Password" required>
            <button type="submit">Login</button>
        </form>
    `);
});

// Handle login
app.post('/index22.html', async (req, res) => {
    const { password } = req.body;
    if(await bcrypt.compare(password, hashedPassword)){
        req.session.loggedIn = true;
        res.redirect('/index.html');
    } else {
        res.send("Incorrect password. Try again.");
    }
});

// Protected page
app.get('/index22.html', (req, res) => {
    if(req.session.loggedIn){
        res.send("<h1>Welcome! You unlocked the page ❤️</h1>");
    } else {
        res.redirect('/index.html');
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
