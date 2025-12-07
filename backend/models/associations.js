import User from './User.js';
import Event from './Event.js';
import EventGroup from './EventGroup.js';
import Attendance from './Attendance.js';

//User to Event through Attendance table
User.belongsToMany(Event, {
    through: Attendance,
    foreignKey: 'userId',
    otherKey: 'eventId',
    as: 'attendedEvents'
});

//Event to User through Attendance tables
Event.belongsToMany(User, {
    through: Attendance,
    foreignKey: 'eventId',
    otherKey: 'userId',
    as: 'participants'
});

//Direct relation User to EventGroup
User.hasMany(EventGroup, {
    foreignKey: 'ownerId',
    as: 'ownedGroups',
    onDelete: 'CASCADE'
});

//Direct relation EventGroup to User
EventGroup.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'owner'
});

//Direct relation EventGroup to Event
EventGroup.hasMany(Event, {
    foreignKey: 'groupId',
    as: 'events',
    onDelete: 'CASCADE'
});

//Direct relation Event to EventGroup
Event.belongsTo(EventGroup, {
    foreignKey: 'groupId',
    as: 'group'
});

//Direct relation Attendance to User
Attendance.belongsTo(User, { 
    foreignKey: 'userId',
    as: 'user'
});

//Direct relation Attendance to Event
Attendance.belongsTo(Event, { 
    foreignKey: 'eventId',
    as: 'event'
});

//Direct relation User to Attendance
User.hasMany(Attendance, { 
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

//Direct relation Event to Attendance
Event.hasMany(Attendance, { 
    foreignKey: 'eventId',
    onDelete: 'CASCADE'
});

export { User, Event, EventGroup, Attendance };