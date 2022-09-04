const { nextDay } = require('date-fns');
const express = require('express')
const cors = require('cors');
const app = express();
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const {logEvents, logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const path = require('path');
const PORT = process.env.PORT || 3500;

console.log('Before midleware')


//Custom midleware
app.use(logger)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// // built-in cookie parser
// app.use(cookieParser());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// open for all routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

console.log('До проверки токена')

app.use(verifyJWT);

app.use('/employees', require('./routes/api/employees'));



console.log('Not found')

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