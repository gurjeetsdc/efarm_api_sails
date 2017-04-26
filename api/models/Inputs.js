/**
 * Inputs.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    autoCreatedAt: true,
    autoUpdatedAt: true,
  attributes: {
  		
  		user:{
	      model:'users'
	    },

        manufacturer:{
         model:'manufacturer'
        },

  		name: {
            type: 'string',
            required: true
        },     
        variety: {
            type: 'string',
            required: true
        },
        units: {
            type: 'string',
            required: true
        },

        price: {
            type: 'string',
            required: true
        },

        quantity: {
            type: 'integer',
            required: true
        },
        purchase_status:
        {
            type:'string',
            enum: ['rent', 'sell']
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
		}
    }
};

