const users  = require('../db/users');
const {client} = require('../app')

let currentId = 1;
function signupUserFn(req, resp){
    let user = req.body;
    let userDataArr = ['username', 'password', 'firstName', 'lastName', 'age'];
    let finalUserObj = {}
    for(let userData of  userDataArr){
        if(!user[userData]){
            return  resp.status(400).json({
                status:'error',
                message:`You forgot to input your ${userData}`
            })
        }
        finalUserObj[userData] = user[userData];
    }

    // if(!user.username){
    //     return  resp.json({
    //         status:'error',
    //         message:'You forgot to input your username'
    //     })
    // }else if(!user.password){
    //     return  resp.json({
    //         status:'error',
    //         message:'You forgot to input your password'
    //     })
    // } else if(!user.firstName){
    //     return  resp.json({
    //         status:'error',
    //         message:'You forgot to input your firstName'
    //     })
    // }else if(!user.lastName){
    //     return  resp.json({
    //         status:'error',
    //         message:'You forgot to input your lastName'
    //     })
    // }

    for(let currentUser of users){
        if(currentUser.username === user.username){
            return resp.status(409).json({
                status:'error',
                message: 'That username already exists',
            })
        }
    }

    // let callback = (currentUser) =>{
    //     return currentUser.username === user.username
    // } 

    // let foundUser = users.find(callback);

    // if(foundUser){
    //     return resp.json({
    //         status:'error',
    //         message: 'That username already exists',
    //     });
    // }
    // finalUserObj['id'] = currentId;
    // currentId++;
    // users.push(finalUserObj); // save user to db

    client.query(`
        INSERT INTO "User"(username, first_name, last_name, age, password)
            VALUES('${finalUserObj.username}', '${finalUserObj.firstName}',
             '${finalUserObj.lastName}', ${finalUserObj.age}, '${finalUserObj.password}')
             
        RETURNING id, username, first_name AS "firstName", last_name AS "lastName", age ;
    `,
    (err, res)=>{
        console.log(err);
        if(err){
            if (err.code == 23505){
                return resp.json({
                        status:'error',
                        message: 'That username already exists',
                    });
            }
        } 
        if(res.rowCount == 1){
            resp.status(201).json({
                data:res.rows[0],
                message: 'You have successfully been registered to the app.'
            });
        }
        
    }
    )

    
}


module.exports = {
    signupUserFn,
}