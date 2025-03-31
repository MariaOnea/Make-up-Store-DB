const config = {
    user: 'Admin',
    password: 'admin1234',
    server: 'DESKTOP-GQSFGT6',
    database: 'MakeupStore_Platform',
    options: {
        trustServerCertificate: true,
        trustedConnection : false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS',
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        encrypt: false
    },
    port: 1434
}

module.exports = config;