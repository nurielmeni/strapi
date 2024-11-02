module.exports = ({ env }) => ({
    email: {
        provider: 'smtp2',
        providerOptions: {
            host: env('STRAPI_ADMIN_SMTP_HOST', 'smtp-relay.gmail.com'), //SMTP Host
            port: env('STRAPI_ADMIN_SMTP_PORT', 587), //SMTP Port
            secure: false,
            username: env('STRAPI_ADMIN_SMTP_USERNAME'),
            password: env('STRAPI_ADMIN_SMTP_PASSWORD'),
            rejectUnauthorized: false,
            requireTLS: false,
            connectionTimeout: 1,
        },
        settings: {
            from: env('STRAPI_ADMIN_SMTP_FROM'),
            replyTo: env('STRAPI_ADMIN_SMTP_REPLY_TO'),
        },
    },

});