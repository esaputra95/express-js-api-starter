const Sequelize = require("sequelize");
const { Db } = require("../../../config/database")

const RedeemDetailModel = Db.define("redeem_details", {
    id: {
        type: Sequelize.INTEGER,
        max: 11,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    redeem_id: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
        field: 'redeem_id'
    },
    gift_id: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
        field: 'gift_id'
    },
    quantity: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: true,
        field: 'quantity'
    },
    poins: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: true,
        field: 'poins'
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

module.exports = RedeemDetailModel;