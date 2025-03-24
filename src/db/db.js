const {Sequelize} = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: "mysql",
        port: config.mysql.port
    }
)

async function testConection(){
    try {
        await sequelize.authenticate();
        console.log("all good");
    } catch (error) {
        console.log("all bad");
    }
}

testConection();

module.exports= sequelize;