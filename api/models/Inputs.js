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

  		name: {
            type: 'string',
            required: true
        },     

        description: {
            type: 'text',
        },

        variety: {
            type: 'string'
        },

        offer_price: {
            type: 'integer'
        },

        offer_price_unit: {
            type: 'string'
        },

        quantity: {
            type: 'integer',
            required: true
        },

        quatity_unit: {
            type: 'string'
        },

        service_fee: {
            type: 'integer'
        },

        service_fee_type: {
            type: 'string'
        },

        discount_type: {
            type: 'string'
        },

        discount_value: {
            type: 'integer'
        },
        
        currency_cd: {
            type: 'string',
        },
        
        timezone: {
            type: 'string'
        },
        
        address_line1: {
            type: 'text'
        },

        address_line2: {
            type: 'text'
        },

        city: {
            type: 'string'
        },

        state: {
            type: 'string'
        },

        postal_code: {
            type: 'string'
        },

        country: {
            type: 'string'
        },

        lat: {
            type: 'string'
        },

        lng: {
            type: 'string'
        },
        status: {
			type: 'string',
			enum: ['Active', 'Deactive']
		},
		isDeleted: {
			type: 'boolean'
		},
        createdAt: { type: 'Date', default: Date.now,autoCreatedAt: true},
		modifiedAt: { type: 'Date', default: Date.now, autoUpdatedAt: true},



  }
};

