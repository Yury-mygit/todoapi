// server!
const fsPromises = require('fs').promises;
const path = require('path');


// fs.readFile('./files/starter.txt', 'utf8' ,(err, data)=>{
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8' ,(err, data)=>{
    if (err) throw err;
    // console.log(data.toString());
    console.log(data);
})

console.log('hello....')

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice to meet you', (err)=>{
//     if (err) throw err;
//     console.log('Writen complite');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'\n\n Yes it is', (err)=>{
//         if (err) throw err;
//         console.log('Appens complite');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'Newreply.txt'), (err)=>{
//             if (err) throw err;
//             console.log('Appens complite');
//         })
//     })

   
// })


process.on('uncaughtException', err=>{
    console.error(`There was an uncaught error ${err}`);
    process.exit(1);
})