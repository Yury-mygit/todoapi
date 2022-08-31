// server!
const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data)
        // await fsPromises.unlonk(path.join(__dirname, 'files', 'starter.txt')); // delete file

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'),data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n Nise to meet you.');
        await fsPromises.rename( path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promisecomplite.txt') );

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promisecomplite.txt'), 'utf8');
        console.log(newData)

    }catch (err) {
        console.error(err)
    }
}

fileOps();

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