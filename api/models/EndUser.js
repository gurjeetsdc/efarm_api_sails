/**
 * EndUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
  		first_name: {
            type: 'string',
            required: true
        },
        last_name: {
            type: 'string',
            required: true
        },     

        email: {
            type: 'string',
            required: true
        },

        phone: {
            type: 'integer',
            required: true
        },

        city: {
            type: 'string',
            required: true
        },

        pincode: {
            type: 'integer',
            required: true
        },

        state: {
            type: 'string',
            required: true
        },

        district: {
            type: 'string',
            required: true
        },

        isDeleted : {
        	type: 'Boolean',
        	defaultsTo: false
        }
  	}
};

