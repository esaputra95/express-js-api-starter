const Sequelize = require("sequelize");
const { Db } = require("../../../config/database")

const RatingModel = Db.define("ratings", {
    id: {
        type: Sequelize.INTEGER,
        max: 50,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    gift_id: {
        type: Sequelize.INTEGER,
        max: 100,
        allowNull: false,
        field: 'gift_id'
    },
    redeem_detail_id: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: false,
        field: 'redeem_detail_id'
    },
    rating: {
        type: Sequelize.INTEGER,
        max: 2,
        allowNull: false,
        field: 'rating'
    },
    user_create: {
        type: Sequelize.STRING,
        max: 50,
        defaultValue: false,
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

module.exports = RatingModel;