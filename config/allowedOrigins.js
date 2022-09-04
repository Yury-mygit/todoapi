const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500'
];

module.exports = allowedOrigins;


// const whitelist = [
//     'https://www.yoursite.com', 
//     'http://127.0.0.1:5500', 
//     'http://localhost:3500',
//     "https://www.google.com"
// ];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {  // || !origin только для разработки
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }

// module.exports = corsOptions;