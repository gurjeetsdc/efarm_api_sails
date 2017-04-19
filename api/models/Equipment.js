/**
 * Equipment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


        user_id:{
          model:'users'
        },
  		name: {
            type: 'string',
            required: true
        },

        category:{
        	model:""
        },

        company:{
        	type:'string'
        },

        model:{
        	type:'string'
        }

        model_year:
        {
        	type:'integer'
        }

        engine_power:
        {
        	type:'integer'
        }

        usage:
        {
        	type:'string'
        },
        purchase_status:
        {
        	type:'string',
        	enum: ['rent', 'sell']
        }

        description: {
            type: 'string'
        },

        termcondition:{
        	type:'string'
        }

        isDeleted:{
            type:'boolean'
        },
        createdAt: { type: 'Date', default: Date.now,autoCreatedAt: true},
        modifiedAt: { type: 'Date', default: Date.now, autoUpdatedAt: true},
  }
};

