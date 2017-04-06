module.exports.security = {
    oauth : {
        version : '2.0',
        token : {
            length: 32,
            expiration: 3600
        }
    },
    admin: {
        email: {
            address: 'gurjeets@smartdatainc.net',
            password: 'gurjeets'
        },

    },
    server: {
        url: 'http://localhost:1337'
    }
};