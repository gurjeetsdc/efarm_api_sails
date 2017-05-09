/**
 * Crops.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
  		
  		seller:{
	      model:'users'
	    },

  		name: {
            type: 'string',
            required: true
        },     

        category: {
            model: 'Category',
            required:true
        },

        variety: {
            type: 'string'
        },

        quantity: {
            type: 'integer',
            required: true
        },

        quantity_unit: {
            type: 'string',
            enum: ['Kg', 'Quintal','Tonnes'],
            required: true
        },

        price : {
            type: 'integer',
            required: true
        },

        grade: {
            type: 'string',
             enum: ['A+', 'A', 'B', 'C', 'D'],
        },

        availibile_from: {
            type: 'json'
        },

        available_period: {
            type: 'integer'
        },

        available_unit: {
            type: 'string',
            enum: ['Days', 'Month','Year'],
            required: true
        },

        supply_ability: {
            type: 'string',
            enum: ['Yes', 'No'],
            required: true
        },

        supply_area: {
            type: 'string',
            enum: ['withinstate', 'anywhere']
        },

        supply_range: {
            type: 'integer'
        },

        payment_method: {
            type: 'string',
            enum: ['COD', 'Cheque', 'Net Banking'],
            required: true
        },

        verified: {
            type: 'string',
            enum: ['Yes', 'No'],
            required: true
        },

        terms: {
            type: 'string'
        },

        image: {
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
            type: 'boolean',
            defaultsTo:false
        }

        // timezone: {
        //     type: 'string'
        // },
        
        // address_line1: {
        //     type: 'text'
        // },

        // address_line2: {
        //     type: 'text'
        // },

        // city: {
        //     type: 'string'
        // },

        // state: {
        //     type: 'string'
        // },

        // postal_code: {
        //     type: 'string'
        // },

        // country: {
        //     type: 'string'
        // },
  }
};

