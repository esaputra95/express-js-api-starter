const Sequelize = require("sequelize");
const { Db } = require("../../../config/database")
const RatingModel = require("./RatingModel");

const GiftModel = Db.define("gifts", {
    id: {
        type: Sequelize.INTEGER,
        max: 11,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: Sequelize.STRING,
        max: 255,
        allowNull: false,
        field: 'name'
    },
    stok: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: true,
        field: 'stok'
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'description'
    },
    poins: {
        type: Sequelize.INTEGER,
        max: 11,
        allowNull: true,
        field: 'poins'
    },
    hot_item: {
        type: Sequelize.INTEGER,
        max: 1,
        allowNull: true,
        defaultValue: 0,
        field: 'hot_item'
    },
    new: {
        type: Sequelize.INTEGER,
        max: 1,
        allowNull: true,
        defaultValue: 0,
        field: 'new'
    },
    best_seller: {
        type: Sequelize.INTEGER,
        max: 1,
        allowNull: true,
        defaultValue: 0,
        field: 'best_seller'
    },
    available: {
        type: Sequelize.INTEGER,
        max: 1,
        allowNull: true,
        defaultValue: 0,
        field: 'available'
    },
    image: {
        type: Sequelize.STRING,
        max: 1,
        allowNull: true,
        field: 'image'
    },
    rating: {
        type: Sequelize.STRING,
        defaultValue: 0,
        field: 'rating'
    },
    user_rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'user_rating'
    },
    user_create: {
        type: Sequelize.INTEGER,
        max: 11,
        defaultValue: null,
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

GiftModel.hasMany(RatingModel, {foreignKey: 'gift_id'})

module.exports = GiftModel;