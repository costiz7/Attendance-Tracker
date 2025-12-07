import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db.js";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['name'],
            },
            {
                unique: true,
                fields: ['email'],
            }
        ]
    }
)

export default User;