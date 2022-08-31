const { nextDay } = require('date-fns');
const express = require('express')
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3500;

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




app.get('/*',(req, res)=>{
    res.sendStatus(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));