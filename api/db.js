const { Client } = require("pg");

class DB {
    constructor() {
        this.client = new Client({
            user: process.env.DB_USER || "postgres",
            host: process.env.DB_HOST || "localhost",
            database: process.env.DB_DATABASE || "postgres",
            password: process.env.DB_PASSWORD || "postgres",
            port: process.env.DB_PORT || 5432,
        });
        this.client.connect();
    }
}
module.exports = new DB();