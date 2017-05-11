/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req,res){
        API(Registration.registerUser,req,res);
    },

    register: function(req,res){
        API(Registration.registerUser,req,res);
    },

    'verify/:email': function(req,res){
        API(Registration.verifyUser,req,res);
    },
    current: function(req,res){
        API(Registration.currentUser,req,res);
    },
    add: function(req,res){
        API(UserService.save,req,res);
    },

    getAllUsers: function(req, res, next) {
        // console.log('req.body********', req.param('sdsd'));

        var page        = req.param('page');
        var count       = req.param('count');
        var skipNo      = (page - 1) * count;
        var search      = req.param('search');
        var roles       = req.param('roles');
        var query       = {};

        query.isDeleted = 'false';
        if(roles) query.roles = roles;

        if (search) {
           query.$or = [
               {
                    firstName: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    lastName: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    email: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    username: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    address: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    city: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    district: {
                        'like': '%' + search + '%'
                    }
                },
                {
                    state: {
                        'like': '%' + search + '%'
                    }
                }
                
           ]
       }

       Users.count(query).exec(function(err, total) {
           if (err) {
               return res.status(400).jsonx({
                   success: false,
                   error: err
               });
           } else {
               Users.find(query).sort({
                   'createdAt': -1
               }).skip(skipNo).limit(count).exec(function(err, users) {
                    if (err) {
                        return res.status(400).jsonx({
                           success: false,
                           error: err
                        });
                    } else {
                        return res.jsonx({
                            success: true,
                            data: {
                                users: users,
                                total: total
                            },
                        });
                    }
               })
           }
       })
    }
};