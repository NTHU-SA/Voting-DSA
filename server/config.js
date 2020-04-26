
module.exports = {
    dbType: 'mariadb', // 'mysql' || 'mariadb' || 'postgres' || 'mssql'
    dbHost: process.env.DATABASE_HOST || '127.0.0.1',
    dbName: process.env.DATABASE_NAME || 'voting',
    dbUser: process.env.DB_USER || 'nthu',
    dbPassword: process.env.DB_PASSWORD || 'nthuvoting',
    serverPort: 3000,
};
