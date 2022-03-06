const Sequelize = require("sequelize");
const { Db } = require("../../../config/database")

const StockHistoryModel = Db.define("stock_history", {
    id: {
        type: Sequelize.INTEGER,
        max: 11,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    gift_id: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'gift_id'
    },
    quantity: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
        field: 'quantity'
    },
    user_create: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: true,
        field: 'user_create'
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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

module.exports = StockHistoryModel;