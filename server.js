const express = require('express');
const app = express();
const port = 5000;

// Middleware to check if it's working hours
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hour = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 15) {
        next();
    } else {
        res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
};

// Serve static files from the public directory
app.use(express.static('public'));

// Use working hours middleware for all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
