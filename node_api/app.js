'use strict';

const restify = require('restify');
const server = restify.createServer();
let users = {};
let max_users_id = 0;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

function respond(res, next, status, data, http_code){

    let response = {
        'status': status,
        'data' : data
    }
    res.setHeader('content-type', 'application/json');
    res.writeHead(http_code);
    res.end(JSON.stringify(response));
    return next();
}

function success(res, next, data){
    respond(res, next, 'success', data, 200);
}

function failure(res, next, data, http_code){
    respond(res, next, 'failure', data, http_code);
}

server.get('/', (req, res, next)=>{
    success(res, next, users);
});

server.get('/users/:id', (req, res, next)=>{
    if(typeof (users[req.params.id]) === 'undefined'){
        failure(res, next, 'The user could not be found on the database', 404);
    }
    success(res, next, users[parseInt(req.params.id)]);
});

server.post('/users', (req, res, next)=>{

    let user = req.params;
    max_users_id++;
    user.id = max_users_id;
    users[user.id] = user;
    success(res, next, users);

});

server.put('/users/:id', (req, res, next)=>{
    if(typeof (users[req.params.id]) === 'undefined'){
        failure(res, next, 'The user could not be found on the database', 404);
    }
    let user = users[parseInt(req.params.id)];
    let updates = req.params;
    for (let field in updates){
        user[field] = updates[field];
    }
    success(res, next, user);

});

server.del('/users/:id', (req, res, next)=>{
    if(typeof (users[req.params.id]) === 'undefined'){
        failure(res, next, 'The user could not be found on the database', 404);
    }
    delete users[parseInt(req.params.id)];
    success(res, next, []);

});

server.listen(8080, ()=>{

    console.log('%s listening at %s', server.name, server.url);

} );