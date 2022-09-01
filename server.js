const { nextDay } = require('date-fns');
const express = require('express')
const cors = require('cors');
const app = express();
const {logEvents, logger} = require('./midleware/logEvents');
const errorHandler = require('./midleware/errorHandler');
const corsOptions = require('./config/corsOptions')

const path = require('path');
const PORT = process.env.PORT || 3500;


//Custom midleware
app.use(logger)



app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));


// routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));



app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});



app.use(errorHandler)



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));