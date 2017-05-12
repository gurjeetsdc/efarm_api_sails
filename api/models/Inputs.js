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
  		
  		name: {
            type: 'string',
            required: true
        },

        user:{
          model:'users'
        },

        category:{
         model:'category'
        },

        manufacturer:{
         model:'manufacturer'
        },

        units: {
            type: 'string',
            required: true
        },

        variety: {
            type: 'string',
            required: true
        },

        price: {
            type: 'integer',
            required: true
        },

        quantity: {
            type: 'integer'
        },

        additionalInformation: {
            type: 'string'
        },

        tearms: {
            type: 'string'
        },

        address: {
            type: 'string',
            required: true
        },

        city: {
            type: 'string',
            required: true
        },

        district: {
            type: 'string',
            required: true
        },

        state: {
            type: 'string',
            required: true
        },
        
        pincode: {
            type: 'integer',
            required: true
        },   

		isDeleted: {
			type: 'boolean',
            defaultsTo: false,
		}
    }
};

