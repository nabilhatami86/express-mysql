const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    database: 'eduwork_cruds_v2',
    host: 'localhost',
    username: 'root',
    password: '',
    dialect: 'mysql'

});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('connect');
    } catch (err) {
        console.log('unable to connect database:', err);
        
    }
})();


module.exports = sequelize;