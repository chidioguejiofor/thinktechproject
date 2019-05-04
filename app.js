
const express = require('express');
const parser = require('body-parser');


server = express();
server.use(parser.json());

server.get('/', (req, res) => {
    return res.json('Welcome to the api');
});

// server.get('/users', (req, resp)=>{
//     return resp.json({
//         data: users,
//     })
// });

server.listen(5000, 'localhost', () =>{
    console.log('Server is running');
});

module.exports = {
    server,
}


require('./routes')