/**
 * Tokens.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

       crop_id:{
          model:'crops'
        },

        user_id:{
          model:'users'
        },

        image_name: {
            type: 'string',
        },

        binary_data: {
            type: 'binary'
        },
        createdAt: { type: 'Date', default: Date.now},
        modifiedAt: { type: 'Date', default: Date.now},        

       

       

    }


    
};