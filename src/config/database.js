require("dotenv").config()

module.exports = {
    dialect: 'mysql',
    // storage: './db.sqlite',
    
    /* MySQL / MariaDB */
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE,

    timezone: '-03:00', // for writing to database

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        
    },
}; 
