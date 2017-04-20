/**
 * Inputs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  		
  		user_id:{
	      model:'users'
	    },

        manufacturer_id:{
          type:'string'
        },

  		name: {
            type: 'string',
            required: true
        },     


        variety: {
            type: 'string'
        },

        units: {
            type: 'integer'
        },

        price: {
            type: 'string',
          
        },

        quantity: {
            type: 'integer'
        },

        tearm_and_conditions: {
            type: 'text'
        },
        status: {
			type: 'string',
			enum: ['Active', 'Deactive'],
            defaultsTo: 'Active',
		},
		isDeleted: {
			type: 'boolean',
            defaultsTo: false,
		},
        createdAt: { type: 'Date', default: Date.now,autoCreatedAt: true},
		modifiedAt: { type: 'Date', default: Date.now, autoUpdatedAt: true},

    }
};

