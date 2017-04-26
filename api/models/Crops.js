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
  		
  		user:{
	      model:'users',
          required:true
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


        price: {
            type: 'integer',
            required: true
        },

        grade: {
            type: 'string'
        },

        color: {
            type: 'string',
            required: true
        },

        size: {
            type: 'string',
            required: true
        },

        other_speciality: {
            type: 'string'
        },

        availibility: {
            type: 'string',
            required: true
        },

        packaging: {
            type: 'string',
            required: true
        },

        supply_ablity: {
            type: 'string',
            required: true
        },

        destination_shipping: {
            type: 'string',
            required: true
        },

        pack_size: {
            type: 'string',
            required: true
        },

        quantity_per_pack: {
            type: 'integer',
            required: true
        },

        label: {
            type: 'string',
            required: true
        },

        payment_method: {
            type: 'string',
            required: true
        },

        moq: {
            type: 'string',
            required: true
        },

        average_lead_time: {
            type: 'integer',
            required: true
        },

        additional_info: {
            type: 'string',
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

        // service_fee: {
        //     type: 'integer'
        // },

        // service_fee_type: {
        //     type: 'string'
        // },

        // discount_type: {
        //     type: 'string'
        // },

        // discount_value: {
        //     type: 'integer'
        // },
        
        // currency_cd: {
        //     type: 'string',
        // },
        
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

