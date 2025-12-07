import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db.js";

class EventGroup extends Model {}

EventGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'EventGroup',
        tableName: 'EventGroups',
        timestamps: true
    }
);

export default EventGroup;