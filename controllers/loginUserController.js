const users = require('../db/users');
const jwt = require('jsonwebtoken');
const {client} = require('../app')
function loginUserFn(req, resp){
    const {username, password} = req.body;

        client.query(`
            SELECT id, username, first_name AS "firstName", last_name AS "lastName", age
             FROM "User"
                WHERE username ='${username}' AND password ='${password}';
        `, 
        (err, res)=>{
            if(res.rows.length == 0){
                return resp.status(404).json({
                        status: 'error',
                        message: 'That username and password was not found',
                    });
            }
            const user = res.rows[0];
            let token = jwt.sign(user, 'PRIVATE_KEY',{
                expiresIn: '2d',
            } );
            return resp.status(200).json({
                data: user,
                message: 'Successfully logged in user',
                token,
            });
        });
    

    
}

module.exports = {
    loginUserFn,
}
