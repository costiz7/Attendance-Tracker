import Event from "../models/Event.js";
import EventGroup from "../models/EventGroup.js";

//Create a random access code
const generateCode = (length = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

//Create a new event
export const createEvent = async (req, res) => {
    try {
        const { groupId, name, startTime, endTime } = req.body;
        const userId = req.user.id;

        if(!groupId || !name || !startTime || !endTime){
            return res.status(400).json({ message: "Empty field!" });
        }

        const group = await EventGroup.findOne({ where: { id: groupId, ownerId: userId } });

        if(!group){
            return res.status(404).json({ message: "Group not found!" });
        }

        let accessCode = generateCode();

        const event = await Event.create({ 
            name,
            groupId,
            accessCode,
            startTime,
            endTime
        });

        res.status(201).json({ message: "Event created successfully!", event });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!", error: error.message });
    }
};

export const getEventsByGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;

        const group = await EventGroup.findOne({ where: { id: groupId, ownerId: userId } });

        if(!group){
            return res.status(404).json({ message: "Group not found!" });
        }

        const events = await Event.findAll({
            where: { groupId },
            order: [['startTime', 'ASC']]
        });

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Get event details
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const event = await Event.findOne({
            where: { id },
            include: {
                model: EventGroup,
                as: 'group',
                where: { ownerId: userId }
            }
        });

        if(!event){
            return res.status(404).json({ message: "The event was not found or you don\'t have access!"});
        }

        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};