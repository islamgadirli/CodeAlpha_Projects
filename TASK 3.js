const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simple in-memory “database”
const users = [];

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }

    // Check if user exists
    const exists = users.find(u => u.username === username);
    if (exists) return res.status(400).send('User already exists');

    // Store password as plain text
    users.push({ username, password });
    res.send('User registered');
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(400).send('Invalid username or password');

    res.send('Login successful');
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
