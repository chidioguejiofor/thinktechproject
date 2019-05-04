const {server} = require('./app');
const {signupUserFn} = require('./controllers/singupController');
const {loginUserFn} =  require('./controllers/loginUserController');
const  {createEvent} = require('./controllers/eventController')

server.post('/signup', signupUserFn);
server.post('/login', loginUserFn)

// Create event 
server.post('/events',createEvent );


// Assignments

// Implement
// Get all events -> GET /events
// Update events -> PATCH /events/:event-id
// Get event by id -> GET /events/:event-id
// Get all events created by a particular /users/:user-id/events




