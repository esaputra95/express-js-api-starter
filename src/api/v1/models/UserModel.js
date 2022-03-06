const Sequelize = require("sequelize");
const { Db } = require("../../../config/database")

const UserModel = Db.define("users", {
    id: {
        type: Sequelize.STRING,
        max: 50,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING,
        max: 100,
        allowNull: false,
        field: 'name'
    },
    address: {
        type: Sequelize.STRING,
        defaultValue: null,
        field: 'address'
    },
    email: {
        type: Sequelize.STRING,
        max: 50,
        defaultValue: null,
        field: 'email'
    },
    username: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'username'
    },
    password: {
        type: Sequelize.STRING,
        max: 255,
        defaultValue: null,
        field: 'password'
    },
    level: {
        type: Sequelize.STRING,
        max: 20,
        defaultValue: null,
        field: 'level'
    },
    access_token: {
        type: Sequelize.STRING,
        max: 255,
        defaultValue: null,
        field: 'access_token'
    },
    user_create: {
        type: Sequelize.STRING,
        max: 50,
        defaultValue: null,
        field: 'user_create'
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: null,
        field: 'created_at'
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at'
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

module.exports = UserModel;