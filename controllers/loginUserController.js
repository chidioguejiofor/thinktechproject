const users = require('../db/users');
const jwt = require('jsonwebtoken');
function loginUserFn(req, resp){
    const {username, password} = req.body;
    
    for(let user of users){
        if(user.username == username && user.password == password){
            

            let userData = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                
            }

            let token = jwt.sign(userData, 'PRIVATE_KEY',{
                expiresIn: '2d',
            } );
            return resp.status(200).json({
                data: userData,
                message: 'Successfully logged in user',
                token,
            })
        }
    }

    return resp.status(404).json({
        status: 'error',
        message: 'That username and password was not found',
    });
}

module.exports = {
    loginUserFn,
}
