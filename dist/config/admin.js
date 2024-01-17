module.exports = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', 'qfTXYO5+LHvSm8vDS7cFmw=='),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT', '7n/iR0vlkPkaeTtPzhJ4Rw=='),
    },
    transfer: {
        token: {
            salt: 'ds'
        }
    }
});
//# sourceMappingURL=admin.js.map