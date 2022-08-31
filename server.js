// server!

// console work
console.log('hello!')


// Global object
// console.log(global)


// Operation system type detecting
const os   = require('os')
const path = require('path')
const math = require('./math')
const {devide} = require('./math')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())


console.log(__dirname)
console.log(__filename)

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename))
console.log(path.parse(__filename))

console.log(math.add(2,4))
console.log(devide(12,4))
