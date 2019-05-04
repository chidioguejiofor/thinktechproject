/**
 * {
 *    title:
 *    creator:
 *    date: 
 * }
 */

const jwt = require('jsonwebtoken');
const events = require('../db/events');

let currentId = 1;
function createEvent(req, resp){
    let eventObj = req.body;

    let authorization = req.headers['authorization'];
    let authArr = authorization.split(' ');
    let bearer = authArr[0];
    let token = authArr[1];

    if(bearer != 'Bearer'){
        return resp.status(401).json({
            status: 'error',
            message: 'You did not specify bearer in your Authorization header '
        })
    }
    let decodedUser = null;
    
    try{
        decodedUser = jwt.verify(token, 'PRIVATE_KEY');
    }catch(err){
        resp.status(401).json({
            status:'error',
            message:'Token is invalid',
        })
    }
    
    let eventAttributes = ['title', 'date'];

    for(let attr of eventAttributes){
        if(!eventObj[attr]){
            resp.status(400).json({
                status: 'error',
                message: `The ${attr} is missing.`
            })
        }
    }

    const finalEvent = {
        id: currentId,
        title: eventObj.title,
        date: eventObj.date,
        creator: decodedUser,
    }
    currentId++;
    
    resp.status(201).json({
        message: 'Successfully created the event',
        data:  finalEvent,
    })
} 

module.exports = {
    createEvent,
}