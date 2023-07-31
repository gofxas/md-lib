const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    define: {
        freezeTableName: true
    }
});

const Files = sequelize.define('Files', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
    },
    pid: {
        type: DataTypes.INTEGER(11),
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
    },
    passwd: {
        type: DataTypes.STRING(40),
    }
});

(async () => {
    await sequelize.sync({ alter: true });
})();

module.exports = {
    Files
}
