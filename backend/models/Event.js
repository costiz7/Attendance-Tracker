import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db.js";

class Event extends Model {}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Event',
        tableName: 'Events',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['accessCode'],
            },
        ]
    }
);

export default Event;