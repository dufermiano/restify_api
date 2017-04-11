

module.exports = function(server){

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
};


