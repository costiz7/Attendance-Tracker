import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db.js";

class Attendance extends Model {}

Attendance.init (
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Attendance',
        tableName: 'Attendances',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'eventId'],
            }
        ]
    }
)

export default Attendance;