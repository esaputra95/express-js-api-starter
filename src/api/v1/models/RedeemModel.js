const Sequelize = require("sequelize");
const { Db } = require("../../../config/database")
const RedeemDetailModel = require("./RedeemDetailModel")

const RedeemModel = Db.define("redeems", {
    id: {
        type: Sequelize.INTEGER,
        max: 11,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    redeem_code: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: true,
        field: 'redeem_code'
    },
    quantity_total: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
        field: 'quantity_total'
    },
    poin_total: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
        field: 'poin_total'
    },
    user_create: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
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

RedeemModel.hasMany(RedeemDetailModel, {foreignKey: 'redeem_id'})

module.exports = RedeemModel;