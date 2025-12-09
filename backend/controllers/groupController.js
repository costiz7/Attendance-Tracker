import EventGroup from '../models/EventGroup.js';
import Event from '../models/Event.js';

//Endpoint for EventGroup creation
export const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        if(!name) {
            return res.status(400).json({ message: 'You forgot about the name!' });
        }

        const newGroup = await EventGroup.create({
            name,
            ownerId: userId
        });

        res.status(201).json({ message: 'Event Group created!', group: newGroup });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//Endpoint for getting user's groups
export const getUserGroups = async (req, res) => {
    try {
        const userId = req.user.id;

        const groups = await EventGroup.findAll({
            where: { ownerId: userId },
            include: [
                {
                    model: Event,
                    as: 'events',
                    attributes: ['id', 'name', 'startTime', 'endTime']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//Endpoint for owners so they can get a specified event group
export const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const group = await EventGroup.findOne({
            where: { id, ownerId: userId },
            include: [
                {
                    model: Event,
                    as: 'events'
                }
            ]
        });

        if(!group) {
            return res.status(404).json({ message: 'Event Group doesn\'t exist' });
        }

        res.status(200).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

//Endpoint for destroying an Event Group
export const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const group = await EventGroup.findOne({
            where: { id, ownerId: userId }
        });

        if(!group) {
            return res.status(404).json({ message: "Group not found!" });
        }

        await group.destroy(); //oncascade

        res.status(200).json({ message: "Group deleted!" });
    } catch(e) {
        console.error(e);
        res.status(500).json({ message: "Server error", error: e.message });
    }
};