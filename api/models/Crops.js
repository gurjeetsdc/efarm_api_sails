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

        quantityUnit: {
            type: 'string',
            enum: ['Kg', 'Quintal','Tonnes','Count','Dozen'],
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

        availableFrom: {
            type: 'json'
        },

        availablePeriod: {
            type: 'integer'
        },

        availableUnit: {
            type: 'string',
            enum: ['Days', 'Month','Year'],
            required: true
        },

        supplyAbility: {
            type: 'string',
            enum: ['Yes', 'No'],
            required: true
        },

        supplyArea: {
            type: 'string',
            enum: ['withinstate', 'anywhere']
        },

        supplyRange: {
            type: 'integer'
        },

        paymentPreference: {
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
            defaultsTo:false
        }
        
  }
};

