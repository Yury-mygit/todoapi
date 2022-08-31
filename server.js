const { nextDay } = require('date-fns');
const express = require('express')
const cors = require('cors');
const app = express();
const {logEvents, logger} = require('./midleware/logEvents');
const errorHandler = require('./midleware/errorHandler');

const path = require('path');
const PORT = process.env.PORT || 3500;


//Custom midleware
app.use(logger)


const whitelist = [
    'https://www.yoursite.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3500',
    "https://www.google.com"
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {  // || !origin только для разработки
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));



app.get('^/$|/index(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/new-page(.html)?', (req, res) =>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

app.get('/old-page(.html)?', (req, res) =>{
    res.redirect(301, 'new-page.html');
});

app.get('/hello(.html)?', (res, req, next)=>{
    console.log('hello colling');
    next()
}, (req, res)=>{
    res.send("hello");
});


// chaining route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);




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