import Attendance from '../models/Attendance.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import EventGroup from '../models/EventGroup.js';

//Controller for when someone joins an event
export const joinEvent = async (req, res) => {
    try {
        const { accessCode } = req.body;
        const userId = req.user.id;

        const event = await Event.findOne({ where: { accessCode } });

        if(!event) {
            return res.status(404).json({ message: "Unavailable Event!" });
        }

        const now = new Date();
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        
        if(now > endTime || now < startTime) {
            return res.status(400).json({ message: "You are too late or too soon for this event." });
        }

        const existingAttendance = await Attendance.findOne({
            where: {
                userId,
                eventId: event.id
            }
        });

        if(existingAttendance) {
            return res.status(400).json({ message: 'You already attended this event' });
        }

        await Attendance.create({
            userId,
            eventId: event.id,
            joinedAt: now
        });

        res.status(201).json({ message: `You attended: ${event.name}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

//Get attendees list
export const getEventParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        const event = await Event.findOne({
            where: { id: eventId },
            include: {
                model: EventGroup,
                as: 'group',
                where: { ownerId: userId }
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'The Event does not exist.' });
        }

        const participants = await Attendance.findAll({
            where: { eventId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email']
                }
            ],
            order: [['joinedAt', 'ASC']]
        });

        res.status(200).json(participants);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

//GET controller for CSV export
export const exportEventAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user.id;

        const event = await Event.findOne({
            where: { id: eventId },
            include: { model: EventGroup, as: 'group', where: { ownerId: userId } }
        });

        if (!event) return res.status(404).json({ message: 'Access denied.' });

        const participants = await Attendance.findAll({
            where: { eventId },
            include: [{ model: User, as: 'user' }],
            order: [['joinedAt', 'ASC']]
        });

        let csvContent = "Name,Email,Joined At,Event\n";

        participants.forEach(p => {
            const name = p.user.name.replace(/,/g, '');
            const email = p.user.email;
            const hour = new Date(p.joinedAt).toLocaleString('en-US');
            const title = event.name.replace(/,/g, '');

            csvContent += `${name},${email},${hour},${title}\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="Attendees_${event.name}.csv"`);
        
        res.status(200).send(csvContent);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Export Error', error: error.message });
    }
};

//CSV Export for an entire group
export const exportGroupAttendance = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;

        const group = await EventGroup.findOne({ 
            where: { id: groupId, ownerId: userId } 
        });

        if (!group) return res.status(404).json({ message: 'Invalid group' });

        const events = await Event.findAll({
            where: { groupId },
            include: [{
                model: Attendance,
                as: 'attendances',
                include: [{ model: User, as: 'user' }]
            }],
            order: [['startTime', 'ASC']]
        });

        let csvContent = "Event,Date,Name,Email,Hour\n";

        events.forEach(ev => {
            const evName = ev.name.replace(/,/g, '');
            const evDate = new Date(ev.startTime).toLocaleDateString('en-US');

            if (ev.attendances && ev.attendances.length > 0) {
                ev.attendances.forEach(att => {
                    const name = att.user.name.replace(/,/g, '');
                    const email = att.user.email;
                    const hour = new Date(att.joinedAt).toLocaleTimeString('en-US');

                    csvContent += `${evName},${evDate},${name},${email},${hour}\n`;
                });
            } else {
                csvContent += `${evName},${evDate},-,-\n`;
            }
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="Report_${group.name}.csv"`);
        res.status(200).send(csvContent);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Export Error', error: error.message });
    }
};