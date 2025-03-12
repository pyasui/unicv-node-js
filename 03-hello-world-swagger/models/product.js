'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {

        }
    };

    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
        }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Product',
        hooks: {
            beforeUpdate: (obj, options) => {
                obj.updatedAt = new Date();
            }
        }
    });

    return Product;
};