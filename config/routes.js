/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /*'/': {
    view: 'homepage'
  },*/

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  * Author : Smartdata                                                                *
  *                                                                          *
  ***************************************************************************/
  
//Authorisation Routes
    'post /authorisation': {
        controller: 'OAuthController',
        action: 'token',
        skipAssets: 'true',
        //swagger path object
        swagger: {
            methods: ['POST'],
            summary: ' Authenticate User ',
            description: 'Authenticate User Description',
            produces: [
                'application/json'
            ],
            tags: [
                'Authenticate'
            ],
            responses: {
                '200': {
                    description: 'Authenticate User',
                    schema: 'Users', // api/model/EndUser.js,
                    type: 'array'
                }
            },
            parameters: ['username','password','client_id','grant_type']

        }
    },

    //User Routes

    'get /user': {
        controller: 'UsersController',
        action: 'getAllUsers',
        skipAssets: 'true',
        //swagger path object
        swagger: {
            methods: ['GET'],
            summary: ' Get User ',
            description: 'GEt User Listing',
            produces: [
                'application/json'
            ],
            tags: [
                'User List'
            ],
            responses: {
                '200': {
                    description: 'List of Users',
                    schema: 'Users', 
                    type: 'array'
                }
            },
            parameters: []

        }
    },

    'post /user': {
        controller: 'UsersController',
        action: 'index',
        skipAssets: 'true',
        //swagger path object
        swagger: {
            methods: ['POST'],
            summary: ' Add User ',
            description: 'Add User Description',
            produces: [
                'application/json'
            ],
            tags: [
                'User'
            ],
            responses: {
                '200': {
                    description: 'Add User',
                    schema: 'Users',
                    type: 'array'
                }
            },
            parameters: []

        }
    },

    'get /user/:id': {
        controller: 'UsersController',
        action: 'find',
        skipAssets: 'true',
        //swagger path object
        swagger: {
            methods: ['GET'],
            summary: ' Get User ',
            description: 'GEt user listing',
            produces: [
                'application/json'
            ],
            tags: [
                'EndUser'
            ],
            responses: {
                '200': {
                    description: 'List of User',
                    schema: 'User',
                    type: 'array'
                }
            },
            parameters: []

        }
    },
    'get /user/verify/:email' :'UsersController.verify/:email',
    
 

  //'get /user/:id' :{ model: 'users', blueprint: 'find'},
};